var privateMethod = {
	randomRange : function(from, to){
		var r_num;
		(from===0||from) && ( (to===0||to) && (r_num=parseInt(Math.random()*(to-from)+from),1) || (r_num=parseInt(Math.random()*(to-from)+from)),1) || 0;
		return r_num;
	},
	getRandomArray : function(len, range_from, range_to, mark){
		if(typeof mark !== 'object') mark = {};
		var arr = [],tmp;
		for(var x = 0;x< len; ++x){
			tmp = privateMethod.randomRange(range_from,range_to);
			while(mark[tmp]){
				tmp = privateMethod.randomRange(range_from,range_to);
			}
			mark[tmp] = true;
			arr.push(tmp);
		}
		return arr;
	},
	getRandomPowerOf2 : function(exp){
		if(exp==1) return 2;
		var tmp = privateMethod.randomRange(0,100);
		if(tmp<=80) return 2;
		else return 4;
	}
};

module.exports = privateMethod;