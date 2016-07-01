/**
 * http://usejsdoc.org/
 */

var _ = require('lodash');
var LogInterface = require ('./lib/log-interface');

function SuperTest(verbosity) {

        this.log = new LogInterface({
            error : function() {
                console.log("OVERRIDDEN ERROR METHOD");
                Function.apply.call(console.log, console, arguments);
            },
            verbosity : function() {
                return verbosity;
            }
        });

}

var superTest = new SuperTest(verbosity=3);

superTest.log.info("Testing, testing, 1, 2, 3...");

superTest.log.error("error test");

superTest.log.verbose(2).error("Should not see this!")
             .or.info("This is the correct message");

