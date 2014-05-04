Zaproxy Script: Proxy Rewrite
=============================

A [Zaproxy][1] script template for rewriting proxied HTTP requests.

Rewriting proxied requests is useful when debugging and developing web services
and you cannot control which server the client is connecting to (but you can
control the client HTTP proxy settings). This is not unlikely when diagnosing
issues with web services being consumed by third-party mobile applications.

See [Debugging SSL on Both iOS Devices and Simulators with Man-in-the-middle
Proxies][2] for help getting started using Zaproxy to debug HTTP traffic from a
mobile device.

See the [Zaproxy Scripts wiki page][3] for more general information on Zaproxy
script extensions.

This script has been tested with Zaproxy version 2.2.2.


License
-------

GPL v3.


Installation
------------

Copy proxy-rewrite.js into the `$ZAP_HOME/scripts/proxy` directory.


Usage
-----

Create a new script from the "scripts" tab. Choose type "proxy" and template
"proxy-rewrite.js". Open the new script in the "script console" tab. Define your
rewrite rules by editing the `REWRITE_RULES` variable. How to create rewrite
rules is described in the template comments.

You must explicitly enable the script before it will be executed. Note, any
errors in the script will automatically disable it when executed.


[1]: https://www.owasp.org/index.php/OWASP_Zed_Attack_Proxy_Project
[2]: http://www.codeproject.com/Articles/484707/Debugging-SSL-on-Both-iOS-Devices-and-Simulators-w
[3]: https://code.google.com/p/zaproxy/wiki/HelpAddonsScriptsScripts

