/**
 * http://usejsdoc.org/
 */



module.exports = function(hooks) {

        var self = this;
	
	// THESE ARE THE DEFAULTS, SHOULD BE OVERWRITTEN/HANDLED BY EXTENDED OBJECTS
	var error = function() {
            console.log("ERROR");
            Function.apply.call(console.log, console, arguments);
	};
	
	var warn = function() {
            console.log("WARN");
            Function.apply.call(console.log, console, arguments);
	};
	
	var info = function() {
            console.log("INFO");
            Function.apply.call(console.log, console, arguments);
	};
	
	var debug = function() {
            console.log("DEBUG");
            Function.apply.call(console.log, console, arguments);
	};

        var verbosity = function() {
            return false;
        };
        var tracers   = function() { 
            return [];
        };
	
	var hooker = {};
	
	
	var errorHook = function() {
            Function.apply.call(self.error, self, arguments);
	};
	
	var warnHook = function() {
            Function.apply.call(self.warn, self, arguments);
	};
	
	var infoHook = function() {
            Function.apply.call(self.info, self, arguments);
	};
	
	var debugHook = function() {
            Function.apply.call(self.debug, self, arguments);
	};
	
	var fullHooks = function() {
            return {
                error : hooker.fullHookFunc(errorHook),
                warn  : hooker.fullHookFunc(warnHook),
                info  : hooker.fullHookFunc(infoHook),
                debug : hooker.fullHookFunc(debugHook)
            };
	};
	
	var stubbedHooks = function() {
            return {
                error : hooker.stubbedHookFunc(),
                warn  : hooker.stubbedHookFunc(),
                info  : hooker.stubbedHookFunc(),
                debug : hooker.stubbedHookFunc()
            };
	};

	function fullHookFunc(cb) {
            return function() {
                Function.apply.call(cb, self, arguments);
                return {
                    or : stubbedHooks()		// or.NO()
                };
            };
	}
	hooker.fullHookFunc = fullHookFunc;
	
	function stubbedHookFunc() {
		return function() {
			return {
				or : fullHooks()			// .or.YES()
			};
		};
	}
	hooker.stubbedHookFunc = stubbedHookFunc;
	
	
	function verbose(v) {
		var curV = this.verbosity();
		var isTrue = false;
		if (v && typeof v !== 'undefined') {
			if (v>=curV) {
				isTrue = true;
			}
		} else {
			isTrue = !!curV;
		}
		return isTrue ? fullHooks() : stubbedHooks();
	}
	
	function trace(id) {
		var isTrue = this.tracers().indexOf(id)>-1;
		return isTrue ? fullHooks() : stubbedHooks();
	}

        this.error     = hooks.error     || error;
        this.warn      = hooks.warn      || warn;
        this.info      = hooks.info      || info;
        this.warn      = hooks.warn      || warn;
        this.verbosity = hooks.verbosity || verbosity;
        this.tracers   = hooks.tracers   || tracers;

        this.verbose = verbose;
        this.trace   = trace;

};


