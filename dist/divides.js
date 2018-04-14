/**
 * 根据数量来随机出分配总数的数组（以整数形式）
 * 
 * @param {Number} total 总数
 * @param {Number} count 数量
 * @param {Function} validator 验证器，使用验证器来检查结果是否合格
 * @param {Number} change 最大的尝试次数，默认为50，如果达到最大次数，会使用最后一组结果
 */
function divides(total, count, validator, change){

  // 分配数过小直接返回
  if (count === 1) return [total];
  if (count <= 0) return [];

  // 总数为0，直接返回个长度为count的数组，每个元素都是0
  if (total === 0) return Array.apply(null, Array(count)).map(function(){return 0});

  // 是否为负值
  var isMinus = false;
  if (total < 0) isMinus = true, total = -total;

  // 保存参数，如果结果不符合规格，可以重试
  var saveTotal = total, saveCount = count;
  
  // 50次机会
	change = change || 50;

  // 循环获取
	var result = [];
	for (var i = 0, l = count - 1; i < l; i++) {
		var random;
		while (true) {
      random = randomOne(total, count);
      
      // 如果随机的数比较小是可以重复的，否则不允许重复
			if (random < 3 || !result.includes(random)) break;
		}
		total = total - random;
		count--;
		result.push(random);
  }
  
  // 把剩下的值放入数组
  result.push(total);

  // 如果为负值，需要给他们都带上负号
  if (isMinus) result = result.map(function(item){ return -item});

  // 如果还有机会并且不符合条件就要重新随机一次
  if (typeof validator === 'function' && --change && !validator(result)) {
		return divides(saveTotal, saveCount, validator, change);
  }

  // 返回结果（降序）
	return result.sort(function(a, b){
		return b - a;
	});
};

/**
 * 根据总数和数量，随机出一个数
 * 
 * @param {Number} total 总数
 * @param {Number} count 数量
 */
function randomOne(total, count) {
	var min = 1,
      max = Math.ceil(total / count * 2);
	if (max < min) return 0;
	var random = Math.round(Math.random() * (max - min)) + min;
	return random;
}