use const_format::formatcp;

use crate::config::FRAMEWORK;


pub const ERROR_PAGE: &'static str = formatcp!(r#"
<style>
:root {{
  --bg: #000;
  --fg: #fff;
  --muted: #6e6e6e;
  --border: #1a1a1a;
}}

* {{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: system-ui, -apple-system, sans-serif;
}}

.wrapper {{
  background: radial-gradient(circle at center, #0a0a0a 0%, #000 100%);
  color: var(--fg);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}}

.container {{
  text-align: center;
  max-width: 520px;
  padding: 40px;
}}

.brand {{
  font-size: 11px;
  letter-spacing: 6px;
  color: var(--muted);
  margin-bottom: 10px;
}}

.version {{
  font-size: 10px;
  letter-spacing: 2px;
  color: #444;
  margin-bottom: 40px;
}}

h1 {{
  font-size: 90px;
  font-weight: 600;
  letter-spacing: -2px;
  line-height: 1;
  text-shadow: 0 0 25px rgba(255,255,255,0.05);
}}

.code {{
  font-size: 12px;
  letter-spacing: 4px;
  color: var(--muted);
  margin-bottom: 20px;
}}

.divider {{
  width: 50px;
  height: 1px;
  background: var(--border);
  margin: 20px auto;
}}

p {{
  font-size: 13px;
  color: var(--muted);
  margin-bottom: 40px;
  line-height: 1.6;
}}

.actions {{
  display: flex;
  gap: 14px;
  justify-content: center;
}}

a {{
  text-decoration: none;
  font-size: 11px;
  letter-spacing: 1px;
  padding: 10px 18px;
  border: 1px solid var(--border);
  color: var(--fg);
  transition: all 0.2s ease;
}}

a:hover {{
  background: var(--fg);
  color: var(--bg);
  border-color: var(--fg);
}}

.ghost {{
  color: var(--muted);
}}

.ghost:hover {{
  color: var(--fg);
  background: transparent;
  border-color: var(--fg);
}}

.container::after {{
  content: "";
  display: block;
  margin: 40px auto 0;
  width: 100px;
  height: 1px;
  background: linear-gradient(to right, transparent, #fff, transparent);
  opacity: 0.08;
}}
</style>

<div class="wrapper">
  <div class="container">
    <div class="brand">{name}</div>
    <div class="version">{version}</div>

    <div class="code">500</div>
    <h1>Internal Error</h1>
    <div class="divider"></div>

    <p>
      Something went wrong while processing your request.<br/>
      The issue has been logged.
    </p>

    <div class="actions">
      <a href="/">HOME</a>
      <a href="javascript:location.reload()" class="ghost">RETRY</a>
    </div>
  </div>
</div>
"#,
    name = FRAMEWORK.name,
    version = FRAMEWORK.version
);