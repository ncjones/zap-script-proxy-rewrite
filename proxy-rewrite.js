/*
 * Rewrite Zaproxy requests.
 *
 * Modify the "REWRITE_RULES" array below to contain your desired rewrite rules.
 * The first matched rule will be applied for any given message.
 *
 * A rewrite rule is an object with two methods: "matches" and "rewrite", both
 * of which require an HttpMessage as the only argument. The "matches" method
 * returns a boolean indicating if the rule matches the message. The "rewrite"
 * method rewrites the request by mutating the given message. See the Zaproxy
 * HttpMessage Javadoc for more help:
 * https://zaproxy.googlecode.com/svn/branches/2.2/javadocs/org/parosproxy/paros/network/HttpMessage.html
 *
 * This is a Zaproxy Script template. It should be copied to the
 * "$ZAP_HOME/scripts/templates/proxy" directory.
 *
 * Copyright 2014 Nathan Jones
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Create a rewrite rule which matches based on an exact host name match.
 */
var hostBasedRewriteRule = function (options) {
    var host = options.host,
        source = options.source,
        target = options.target,
        headers = options.headers;

    return {

        matches: function (msg) {
	        var header = msg.getRequestHeader(),
		        hostName = header.getHostName();
            return hostName == host;
        },

        rewrite: function (msg) {
	        var header = msg.getRequestHeader(),
		        requestLine = header.getPrimeHeader(),
                newRequestLine = requestLine.replace(source, target);
		    println('rewriting request: ' + requestLine);
		    for (key in headers) {
			    header.setHeader(key, headers[key]);
		    }
		    msg.setRequestHeader(newRequestLine + '\n'
                + header.getHeadersAsString());        
        }

    };
};

//===============================================
// Rewrite rules 
// Replace the following example rewrite rules with your own.

var REWRITE_RULES = [
	hostBasedRewriteRule({
        host: 'mydomain', // hostname being matched on
		source: 'https://mydomain/', // text to replace in request line
		target: 'http://localhost:8000/', // replacement text for request line
		headers: {
			// headers to replace
			'Host': 'localhost'
		}
	}),
	hostBasedRewriteRule({
        host: 'otherdomain', // hostname being matched on
		source: 'http://otherdomain/', // text to replace in request line
		target: 'http://localhost:8085/', // replacement text for request line
		headers: {
			// headers to replace
			'Host': 'localhost',
			'Authorization': 'api-key: abcd1234'
		}
	})
];

//===============================================

function getRewriteRule(msg) {
    for (var i = 0; i < REWRITE_RULES.length; i += 1) {
        var rewriteRule = REWRITE_RULES[i];
        if (rewriteRule.matches(msg)) {
            return rewriteRule;
        }
    }
	return null;
}

function proxyRequest(msg) {
	var rule = getRewriteRule(msg);
	if (rule) {
        rule.rewrite(msg);
	}
	return true;
}

function proxyResponse(msg) {
	return true;
}

