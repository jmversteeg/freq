var chai = require("chai");
var sinonChai = require("sinon-chai");
var chaiAsPromised = require("chai-as-promised");

var sinon = require('sinon');

chai.use(chaiAsPromised);
chai.use(sinonChai);

chai.should();