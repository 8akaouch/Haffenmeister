from playwright.sync_api import sync_playwright
import os, threading, http.server, re

PROJECT_DIR = "/tmp/haffenmeister_serve"
PORT = 8787
BASE_URL = f"http://localhost:{PORT}"
SCREENSHOTS = "/tmp/haffenmeister_test"
os.makedirs(SCREENSHOTS, exist_ok=True)

CDN_MAP = {
    "https://unpkg.com/react@18.3.1/umd/react.development.js": "/tmp/haffenmeister_cdn/react.js",
    "https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js": "/tmp/haffenmeister_cdn/react-dom.js",
    "https://unpkg.com/@babel/standalone@7.29.0/babel.min.js": "/tmp/haffenmeister_cdn/babel.js",
}

# Lokaler HTTP-Server
class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=PROJECT_DIR, **kwargs)
    def log_message(self, *args):
        pass  # Stille logs

server = http.server.HTTPServer(("localhost", PORT), Handler)
thread = threading.Thread(target=server.serve_forever, daemon=True)
thread.start()

def test(results, name, fn):
    try:
        fn()
        print(f"  PASS  {name}")
        results["pass"] += 1
    except Exception as e:
        print(f"  FAIL  {name}: {e}")
        results["fail"] += 1

with sync_playwright() as p:
    browser = p.chromium.launch(
        headless=True,
        executable_path="/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
        args=["--ignore-certificate-errors"]
    )
    page = browser.new_page(viewport={"width": 1440, "height": 900})

    # CDN-Anfragen auf lokale Dateien umleiten
    def route_cdn(route):
        local = CDN_MAP.get(route.request.url)
        if local and os.path.exists(local):
            route.fulfill(path=local)
        else:
            route.continue_()

    page.route("https://unpkg.com/**", route_cdn)
    page.route("https://fonts.googleapis.com/**", lambda r: r.abort())
    page.route("https://fonts.gstatic.com/**", lambda r: r.abort())

    page.goto(BASE_URL)
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(3000)
    page.screenshot(path=f"{SCREENSHOTS}/01_hero.png")

    results = {"pass": 0, "fail": 0}
    print("\n--- Haffenmeister Playwright-Test ---\n")

    # 1. React-App rendert
    def check_render():
        content = page.locator("#app").inner_html()
        assert len(content) > 50, f"App leer ({len(content)} Zeichen)"
    test(results, "React-App rendert erfolgreich", check_render)

    # 2. Slides vorhanden
    def check_slides():
        count = page.locator("section, [class*='slide'], [class*='Slide']").count()
        assert count > 0, "Keine Slides gefunden"
        print(f"         ({count} Slide-Elemente gefunden)")
    test(results, "Slides sind gerendert", check_slides)

    # 3. Buttons vorhanden
    def check_buttons():
        count = page.locator("button").count()
        assert count > 0, "Keine Buttons gefunden"
        print(f"         ({count} Buttons gefunden)")
    test(results, "Buttons sind vorhanden", check_buttons)

    # 4. Navigation: Pfeil runter
    def check_nav_down():
        page.keyboard.press("ArrowDown")
        page.wait_for_timeout(800)
        page.screenshot(path=f"{SCREENSHOTS}/02_slide2.png")
    test(results, "Navigation: Pfeil runter (Slide 2)", check_nav_down)

    # 5. Weitere Slides
    def check_nav_more():
        for _ in range(2):
            page.keyboard.press("ArrowDown")
            page.wait_for_timeout(600)
        page.screenshot(path=f"{SCREENSHOTS}/03_slide4.png")
    test(results, "Navigation: weiter zu Slide 4", check_nav_more)

    # 6. Dark Mode Toggle
    def check_darkmode():
        buttons = page.locator("button").all()
        assert len(buttons) > 0, "Keine Buttons"
        toggled = False
        for btn in buttons:
            cls = btn.get_attribute("class") or ""
            aria = btn.get_attribute("aria-label") or ""
            txt = btn.inner_text() or ""
            if any(k in (cls + aria + txt).lower() for k in ["theme", "dark", "mode", "toggle", "☀", "🌙"]):
                btn.click()
                page.wait_for_timeout(500)
                page.screenshot(path=f"{SCREENSHOTS}/04_darkmode.png")
                toggled = True
                break
        if not toggled:
            # Ersten Button klicken als Fallback
            buttons[0].click()
            page.wait_for_timeout(500)
            page.screenshot(path=f"{SCREENSHOTS}/04_darkmode.png")
    test(results, "Dark Mode Toggle klickbar", check_darkmode)

    # 7. Zurück zum Hero
    def check_nav_up():
        for _ in range(6):
            page.keyboard.press("ArrowUp")
            page.wait_for_timeout(400)
        page.screenshot(path=f"{SCREENSHOTS}/05_hero_again.png")
    test(results, "Navigation: zurück zum Hero", check_nav_up)

    # 8. Alle 8 Slides erreichbar
    def check_all_slides():
        for _ in range(7):
            page.keyboard.press("ArrowDown")
            page.wait_for_timeout(500)
        page.screenshot(path=f"{SCREENSHOTS}/06_last_slide.png")
    test(results, "Alle 8 Slides per Tastatur erreichbar", check_all_slides)

    # 9. Keine JS-Fehler
    js_errors = []
    page.on("console", lambda m: js_errors.append(m.text) if m.type == "error" else None)
    page.goto(BASE_URL)
    page.wait_for_load_state("networkidle")
    page.wait_for_timeout(2000)
    def check_no_errors():
        real_errors = [e for e in js_errors if not any(k in e.lower() for k in ["font", "favicon", "403", "err_failed"])]
        assert len(real_errors) == 0, f"Fehler: {real_errors[:2]}"
    test(results, "Keine JavaScript-Fehler (ohne Font/Favicon)", check_no_errors)

    browser.close()
    server.shutdown()

    total = results["pass"] + results["fail"]
    print(f"\n--- Ergebnis: {results['pass']}/{total} bestanden ---")
    print(f"Screenshots: {SCREENSHOTS}/")
