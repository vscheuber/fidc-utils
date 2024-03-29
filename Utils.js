/*
 * Copyright 2014-2020 ForgeRock AS. All Rights Reserved
 *
 * Use of this code requires a commercial software license with ForgeRock AS.
 * or with one of its affiliates. All use shall be exclusively subject
 * to such license between the licensee and ForgeRock AS.
 */



/*
 * Base64 encode / decode
 *  http://www.webtoolkit.info/
 * 
 * Example:
 * Base64.encode('some string')
 * Base64.decode('some encoded string')
 */
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(input){var output="";var chr1,chr2,chr3,enc1,enc2,enc3,enc4;var i=0;input=Base64._utf8_encode(input);while(i<input.length){chr1=input.charCodeAt(i++);chr2=input.charCodeAt(i++);chr3=input.charCodeAt(i++);enc1=chr1>>2;enc2=(chr1&3)<<4|chr2>>4;enc3=(chr2&15)<<2|chr3>>6;enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64}else if(isNaN(chr3)){enc4=64}output=output+this._keyStr.charAt(enc1)+this._keyStr.charAt(enc2)+this._keyStr.charAt(enc3)+this._keyStr.charAt(enc4)}return output},decode:function(input){var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(i<input.length){enc1=this._keyStr.indexOf(input.charAt(i++));enc2=this._keyStr.indexOf(input.charAt(i++));enc3=this._keyStr.indexOf(input.charAt(i++));enc4=this._keyStr.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;output=output+String.fromCharCode(chr1);if(enc3!=64){output=output+String.fromCharCode(chr2)}if(enc4!=64){output=output+String.fromCharCode(chr3)}}output=Base64._utf8_decode(output);return output},_utf8_encode:function(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c)}else if(c>127&&c<2048){utftext+=String.fromCharCode(c>>6|192);utftext+=String.fromCharCode(c&63|128)}else{utftext+=String.fromCharCode(c>>12|224);utftext+=String.fromCharCode(c>>6&63|128);utftext+=String.fromCharCode(c&63|128)}}return utftext},_utf8_decode:function(utftext){var string="";var i=0;var c=c1=c2=0;while(i<utftext.length){c=utftext.charCodeAt(i);if(c<128){string+=String.fromCharCode(c);i++}else if(c>191&&c<224){c2=utftext.charCodeAt(i+1);string+=String.fromCharCode((c&31)<<6|c2&63);i+=2}else{c2=utftext.charCodeAt(i+1);c3=utftext.charCodeAt(i+2);string+=String.fromCharCode((c&15)<<12|(c2&63)<<6|c3&63);i+=3}}return string}};

/*
 * Base32(Hex) encode / decode
 *  https://technote.fyi/code/javascript/base32-encoding-and-decoding-in-javascript/
 * 
 * Example:
 * Base32.encode('Hello Ron!')
 * Base32.decode('JBSWY3DPEBJG63RB')
 * Base32Hex.encode('Hello Ron!')
 * Base32Hex.decode('91IMOR3F4196URH1');
 */
var Base32={a:"ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",pad:"=",encode:function(r){var a,t,h=this.a,e=this.pad,c=r.length,o="",A=0,d=0;for(i=0;i<c;i+=5)a=248&(t=r.charCodeAt(i)),o+=h.charAt(a>>3),A=7&t,d=2,i+1<c&&(a=192&(t=r.charCodeAt(i+1)),o+=h.charAt((A<<2)+(a>>6)),o+=h.charAt((62&t)>>1),A=1&t,d=4),i+2<c&&(a=240&(t=r.charCodeAt(i+2)),o+=h.charAt((A<<4)+(a>>4)),A=15&t,d=1),i+3<c&&(a=128&(t=r.charCodeAt(i+3)),o+=h.charAt((A<<1)+(a>>7)),o+=h.charAt((124&t)>>2),A=3&t,d=3),i+4<c&&(a=224&(t=r.charCodeAt(i+4)),o+=h.charAt((A<<3)+(a>>5)),o+=h.charAt(31&t),A=0,d=0);0!=d&&(o+=h.charAt(A<<d));var n=8-o.length%8;return 8==n?o:1==n?o+e:3==n?o+e+e+e:4==n?o+e+e+e+e:6==n?o+e+e+e+e+e+e:void 0},decode:function(r){var a,t,h,e=r.length,c=this.a+this.pad,o=0,A="";for(r=r.toUpperCase(),i=0;i<e;i+=1)(a=c.indexOf(r.charAt(i)))>=0&&a<32&&(t=t<<5|a,(o+=5)>=8&&(h=t>>o-8&255,A+=String.fromCharCode(h),o-=8));return o>0&&0!==(h=(t<<8-o&255)>>8-o)&&(A+=String.fromCharCode(h)),A}};
var Base32Hex={a:"0123456789ABCDEFGHIJKLMNOPQRSTUV",pad:"=",encode:Base32.encode,decode:Base32.decode};

console.log("hashCode('Hello World')");
console.log(hashCode("Hello World"));
console.log("---\n");

console.log("generateNumericToken('xxx-xxx')");
console.log(generateNumericToken('xxx-xxx'));
console.log("---\n");

console.log("generateAlphaNumericToken('xxx-xxxx-xxxx-xxx')");
console.log(generateAlphaNumericToken('xxx-xxxx-xxxx-xxx'));
console.log("---\n");

var now = new Date();
console.log("getGeneralizedTime(new Date())");
console.log(getGeneralizedTime(now));
console.log("---\n");

console.log("parseGeneralizedTime(new Date())");
console.log(parseGeneralizedTime(getGeneralizedTime(now)));
console.log(getGeneralizedTime(parseGeneralizedTime(getGeneralizedTime(now))));
console.log("---\n");

sleep(2000);
console.log("age(date)");
console.log(age(now));
console.log("---\n");

console.log("pad(21, 5)");
console.log(pad(21, 5));
console.log("---\n");

console.log("parseUrl('https://openam-volker-dev.forgeblocks.com/am/XUI/?realm=/bravo&authIndexType=service&authIndexValue=InitiateOwnerClaim#/')");
console.log(parseUrl('https://openam-volker-dev.forgeblocks.com/am/XUI/?realm=/bravo&authIndexType=service&authIndexValue=InitiateOwnerClaim#/'));
console.log("---\n");

console.log("titleCase('ALL UPPERCASE AND all lowercase')");
console.log(titleCase('ALL UPPERCASE AND all lowercase'));
console.log(titleCase(parseUrl('https://openam-volker-dev.forgeblocks.com/am/XUI/?realm=/bravo&authIndexType=service&authIndexValue=InitiateOwnerClaim#/').searchParam.authIndexType));
console.log("---\n");

console.log("formatOnfidoZipCode('786260000')");
console.log(formatOnfidoZipCode('786260000'));
console.log("---\n");

 /*
  * Generate a hash for an input string.
  * 
  * Example:
  * hashCode("Hello World") produces '3432422020'
  * hashCode("What a wonderful world") produces '4100313561'
  */
function hashCode(str) {
  var hash = 0, i, chr;
  for (i = 0; i < str.length; i++) {
    chr   = str.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return (hash >>> 0);
}

 /*
  * Generate a token in the desired format. All 'x' characters will be replaced with a random number 0-9.
  * 
  * Example:
  * 'xxxxx' produces '28535'
  * 'xxx-xxx' produces '432-521'
  */
function generateNumericToken(format) {
    return format.replace(/[x]/g, function(c) {
        var r = Math.random()*10|0;
        var v = r;
        return v.toString(10);
    });
}

/*
 * Generate a token in the desired format. All 'x' characters will be replaced with a random number 0-9 or character a-z.
 * 
 * Example:
 * 'xxxxx' produces '28d3t'
 * 'xxx-xxxx-xxxx-xxx' produces 'nqf-47ap-hj94-gem'
 */
function generateAlphaNumericToken(format) {
   return format.replace(/[x]/g, function(c) {
       var r = Math.random()*36|0;
       var v = r;
       return v.toString(36);
   });
}

/*
 * Convert a Date object to the generalize time format used in LDAP directories
 * 
 * e.g.: 20201009093416Z
 */
function getGeneralizedTime(date) {
    var generalizedTime = ("")
        .concat(date.getFullYear())
        .concat(pad(date.getMonth()+1,2))
        .concat(pad(date.getDate(),2))
        .concat(pad(date.getHours(),2))
        .concat(pad(date.getMinutes(),2))
        .concat(pad(date.getSeconds(),2))
        .concat("Z").toString();
    return generalizedTime;
}

/*
 * Parse a generalized time string used in LDAP directories into a Date object
 * 
 * e.g.: time=20201009093416Z
 */
function parseGeneralizedTime(time) {
    return new Date(
        parseInt(time.toString().substring(0, 4), 10),     // Year
        parseInt(time.toString().substring(4, 6), 10) - 1, // Month (zero-based)
        parseInt(time.toString().substring(6, 8), 10),     // Day of month
        parseInt(time.toString().substring(8, 10), 10),    // Hours
        parseInt(time.toString().substring(10, 12), 10),   // Minutes
        parseInt(time.toString().substring(12, 14), 10),   // Seconds
    );
}

/*
 * Determines the age of the Date object passed in. Use this to determine if a date is within a validity window or has expired already.
 */
function age(date) {
    var now = new Date();
    return Math.floor((now.getTime() - date.getTime()) / 1000);
}

/*
 * Stop the main thread execution for # of ms.
 */
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

/*
 * Pad a number with leading zeroes
 * 
 * e.g.: pad(21,5) = 00021
 */
function pad(num, size) {
    var s = "0000000000" + num;
    return s.substr(s.length-size);
}

/*
 * Parse a URL into its components and make them easily accessible by name
 *
 * Use in a Scripte Decision Node Script as follows:
 * var referer = parseUrl(requestHeaders.get("referer").get(0));
 * var origin = referer.origin;
 * 
 * e.g.: https://openam-volker-dev.forgeblocks.com/am/XUI/?realm=/bravo&authIndexType=service&authIndexValue=InitiateOwnerClaim#/
 * {
 *     hash: '#/',
 *     host: 'openam-volker-dev.forgeblocks.com',
 *     hostname: 'openam-volker-dev.forgeblocks.com',
 *     href: 'https://openam-volker-dev.forgeblocks.com/am/XUI/?realm=/bravo&authIndexType=service&authIndexValue=InitiateOwnerClaim#/',
 *     origin: 'https://openam-volker-dev.forgeblocks.com',
 *     pathname: '/am/XUI/',
 *     port: '',
 *     protocol: 'https',
 *     search: '?realm=/bravo&authIndexType=service&authIndexValue=InitiateOwnerClaim',
 *     username: '',
 *     password: '',
 *     searchParam: {
 *         realm: '/bravo',
 *         authIndexType: 'service',
 *         authIndexValue: 'InitiateOwnerClaim'
 *     }
 * }
 */
function parseUrl(href) {
    var m = href.match(/^(([^:\/?#]+):?(?:\/\/((?:([^\/?#:]*):([^\/?#:]*)@)?([^\/?#:]*)(?::([^\/?#:]*))?)))?([^?#]*)(\?[^#]*)?(#.*)?$/),
    r = {
        hash: m[10] || "",                      // #/
        host: m[3] || "",                       // openam-volker-dev.forgeblocks.com
        hostname: m[6] || "",                   // openam-volker-dev.forgeblocks.com
        href: m[0] || "",                       // https://openam-volker-dev.forgeblocks.com/am/XUI/?realm=/bravo&authIndexType=service&authIndexValue=InitiateOwnerClaim#/
        origin: m[1] || "",                     // https://openam-volker-dev.forgeblocks.com
        pathname: m[8] || (m[1] ? "/" : ""),    // /am/XUI/
        port: m[7] || "",                       // 
        protocol: m[2] || "",                   // https
        search: m[9] || "",                     // ?realm=/bravo&authIndexType=service&authIndexValue=InitiateOwnerClaim
        username: m[4] || "",                   // 
        password: m[5] || "",                   // 
        searchParam: {}                         // { realm: '/bravo',
                                                //   authIndexType: 'service',
                                                //   authIndexValue: 'InitiateOwnerClaim' }
    };
    if (r.protocol.length == 2) {
        r.protocol = "file:///" + r.protocol.toUpperCase();
        r.origin = r.protocol + "//" + r.host;
    }
    if (r.search.length > 2) {
        var query = (r.search.indexOf('?') === 0) ? r.search.substr(1) : r.search;
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        r.searchParam[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
    }
    r.href = r.origin + r.pathname + r.search + r.hash;
    return r;
};

/*
 * Output str in title case
 * 
 * e.g.: 'ALL UPPERCASE AND all lowercase' = 'All Uppercase And All Lowercase'
 */
function titleCase(input) {
    var str = input.toString();
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].slice(1)
    }
    return splitStr.join(' '); 
}

/*
 * Format ZIP code from Onfido identity proofing output
 * 
 * e.g.: 786260000 = 78626
 *       786261234 = 78626-1234
 */
function formatOnfidoZipCode(str) {
  if (str.substring(5) == "0000") {
    return str.substring(0,5)
  }
  else {
    return str.substring(0,5) + "-" + str.substring(5);
  }
}

/*
 * Store attributes in shared state for use with the Create/Patch Object nodes.
 */
function setSharedObjectAttribute(name, value) {
  	 var storage = sharedState.get("objectAttributes");
    if (storage && value) {
      	if (storage.put) {
	          storage.put(name, value);
        }
      	else {
          	storage[name] = value;
        }
    }
    else if (value) {
        sharedState.put("objectAttributes", JSON.parse("{\""+name+"\":\""+value+"\"}"));
    }
}

/*
 * Read attributes in shared state for use with the Create/Patch Object nodes.
 */
function getSharedObjectAttribute(name) {
    var storage = sharedState.get("objectAttributes");
    if (storage) {
      	if (storage.get) {
            return sharedState.get("objectAttributes").get(name);
        }
      	else {
            return storage.name;
        }
    }
    return null;
}

/*
 * Store attributes in transient state for use with the Create/Patch Object nodes.
 */
function setTransientObjectAttribute(name, value) {
    var transientStorage = transientState.get("objectAttributes");
    if (transientStorage && value) {
      	if (transientStorage.put) {
            transientStorage.put(name, value);
        }
      	else {
            transientStorage[name] = value;
        }
    }
    else if (value) {
    transientState.put("objectAttributes", JSON.parse("{\""+name+"\":\""+value+"\"}"));
    }
}

/*
 * Read attributes in transient state for use with the Create/Patch Object nodes.
 */
function getTransientObjectAttribute(name) {
    var transientStorage = transientState.get("objectAttributes");
    if (transientStorage) {
      	if (transientStorage.get) {
            return transientState.get("objectAttributes").get(name);
        }
      	else {
            return transientStorage.name;
        }
    }
    return null;
}

/*
 * Returns the value of the requested header
 */
function getHeader(headerName) {
    return requestHeaders.get(headerName).get(0);
}

/*
 * !!! ASSUMES ID CLOUD !!!
 *
 * Returns the client's IP address
 */
function getClientIPAddress() {
    return getHeader("x-forwarded-for").split(',')[0];
}
