describe('POST commands', function(){
	describe('TDD test folder filenames', function(){
		it('must contain this test JavaScript file', function () {
			$.ajax({
				"url": 'http://localhost:8080/',
				"data": {
					"hello": 'world'
				},
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