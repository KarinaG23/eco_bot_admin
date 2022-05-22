module.exports = function(status) {
	return [
		[
			{
				text: `Активні звернення ${status.active>0?`(${(status.active)})`:``}`,
				callback_data: 'active_appeal'
			}
		],
        [
			{
				text: `Опрацьовані звернення ${status.done>0?`(${(status.done)})`:``}`,
				callback_data: 'done_appeal'
			}
		],
        [
			{
				text: `Інформаційна дошка `,
				callback_data: 'inf_board',
				
			},
		],
		

	];
};
