VISITOR.pushDeclVar = function(_name, _index)
{
	if(_index == undefined)
	{
		var currentScope = VISITOR.CURRENT_Function + 1;
		COMPILER.VAR_STATE[currentScope].push(_name);
	}
	else COMPILER.VAR_STATE[_index].push(_name);
}

VISITOR.getDeclVar = function(_name, _index)
{
	var _state;
	if(_index == undefined)
	{
		var currentScope = VISITOR.CURRENT_Function + 1;
		_state = COMPILER.VAR_STATE[currentScope].push(_name);
	}
	else _state =COMPILER.VAR_STATE[_index].push(_name);
	console.log(_state);
}

VISITOR.checkUndefVar = function(_name)
{
	var currentScope = VISITOR.CURRENT_Function + 1;
	var _exists = false;
	
	for(var i = currentScope; i > -1; i--)
	{
		if(COMPILER.VAR_STATE[i].indexOf(_name) > -1)
		{
			_exists = true;
			break;
		}
		else if(COMPILER.GLOBAL.indexOf(_name) > -1)
		{
			_exists = true;
			break;
		}
	}

	if(!_exists)
	{
		COMPILER.VAR_STATE[currentScope].push(_name);
		COMPILER.DECL.push( "var " + _name + ";");
		
	}
}

VISITOR.addFunctionVarInit = function(_name)
{
	if(VISITOR.CURRENT_Function > -1)
	{
		if(COMPILER.INFO.SCOPE[VISITOR.Function_STATE[VISITOR.CURRENT_Function]].init.indexOf(_name) < 0)
		COMPILER.INFO.SCOPE[VISITOR.Function_STATE[VISITOR.CURRENT_Function]].init.push(_name);
	}
}

VISITOR.addFunctionVarUse = function(_value)
{
	if(VISITOR.CURRENT_Function > -1)
	{
		if(COMPILER.INFO.SCOPE[VISITOR.Function_STATE[VISITOR.CURRENT_Function]].use.indexOf(_value) < 0 && VISITOR.IGNORE.indexOf(_value) < 0)
		COMPILER.INFO.SCOPE[VISITOR.Function_STATE[VISITOR.CURRENT_Function]].use.push(_value);
	}
}

VISITOR.addFunctionVarCall = function(_id, _type)
{
	if(COMPILER.INFO.SCOPE[_id] && COMPILER.INFO.SCOPE[_id].call.indexOf(_type) < 0)
	COMPILER.INFO.SCOPE[_id].call.push(_type);
}

VISITOR.addFunctionVarParam = function(_id, _number)
{
	if(COMPILER.INFO.SCOPE[_id] && COMPILER.INFO.SCOPE[_id].param.indexOf(_number) < 0)
	COMPILER.INFO.SCOPE[_id].param.push(_number);
}

VISITOR.disableFastFunction = function()
{
	if(COMPILER.INFO.SCOPE[VISITOR.Function_STATE[VISITOR.CURRENT_Function]])
	{
		//COMPILER.INFO.SCOPE[VISITOR.Function_STATE[VISITOR.CURRENT_Function]].fast = false;
	}
}

VISITOR.readOnlyVar = function(_name)
{
	VISITOR.addFunctionVarInit(_name);
	if(COMPILER.READ_ONLY.indexOf(_name) > -1)
	{
		console.log("[!] Fatal error: " + _name + " is a read only variable");
		process.exit(1);
	}
}

VISITOR.callExpression = require("./callExpression.js");

VISITOR.arrayExpression = require("./arrayExpression.js");
