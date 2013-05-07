describe('POST commands', function(){
	describe('TDD test folder filenames', function(){
		it('must contain this test JavaScript file', function () {
			$.ajax({
				"url": 'http://localhost:7357/post/',
				"data": {
					"send": 'data'
				},
				"dataType": 'json',
				"type": 'post',
				"success": function (data) {
					debugger;
				},
				"error": function (a,b,c) {
					debugger;
				}
			});
		})
	})
})