$(document).ready(function() {
  $('#list2').jqGrid({
    url: 'http://localhost:4444/displaychits',
    datatype: 'json',
    colNames: [
      'ID',
      'Chit Number',
      'Start Date',
      'End Date',
      'Amount',
      'No. of Persons',
    ],
    colModel: [
      { name: '_id', index: 'id', width: 200 },
      { name: 'chitNumber', index: 'chitNumber', width: 200 },
      { name: 'startDate', index: 'startDate', width: 200 },
      { name: 'endDate', index: 'endDate', width: 200, align: 'right' },
      { name: 'amount', index: 'amount', width: 80, align: 'right' },
      {
        name: 'no_of_persons',
        index: 'no_of_persons',
        width: 100,
        align: 'right',
      },
    ],
    rowNum: 10,
    rowList: [10, 20, 30],
    pager: '#pager2',
    sortname: 'id',
    viewrecords: true,
    sortorder: 'desc',
    caption: 'Chits',
  });
  $('#list2').jqGrid('navGrid', '#pager2', {
    edit: false,
    add: true,
    del: false,
  });
});
