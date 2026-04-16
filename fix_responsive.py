import re

with open('src/App.css', 'r') as f:
    css = f.read()

# Fix services grid overflow
services_css = """
.services-grid-new {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}
"""
services_new = """
.services-grid-new {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

@media (max-width: 768px) {
  .services-grid-new {
    grid-template-columns: 1fr;
  }
}
"""
css = css.replace(services_css.strip(), services_new.strip())

# Add global word break for headers to avoid extreme wrapping issues
css += """\n
/* Responsive Headers Fix */
.app h1, .app h2, .app h3, .app .about-bio-massive {
  word-break: break-word;
  overflow-wrap: break-word;
}
"""

# Reduce huge clamp minimums
css = re.sub(r'clamp\(64px', 'clamp(36px', css)
css = re.sub(r'clamp\(54px', 'clamp(36px', css)
css = re.sub(r'clamp\(48px', 'clamp(32px', css)
css = re.sub(r'clamp\(40px', 'clamp(32px', css)

with open('src/App.css', 'w') as f:
    f.write(css)

print("Responsive patches applied successfully!")
