
function identify_first_last_row(array, element) {
  var first_position = array.indexOf(element) + 1;
  var last_position = array.lastIndexOf(element) + 1;
  var num_rows = last_position - first_position + 1;
  return [first_position, num_rows];
}

function get_column_number_by_name(sheet, col_name) {
  var range = sheet.getRange(1, 1, 1, sheet.getMaxColumns());
  var values = range.getValues();
  for (var row in values) {
    for (var col in values[row]) {
      if (values[row][col] == col_name) {
        var col_num = parseInt(col) + 1;
        return col_num;
      }
    }
  }
}


function fillArray(value, len) {
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr.push(value);
  }
  return arr;
}

function get_date(delay) {
  var date = new Date();
  date.setDate(date.getDate() + delay);
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  } 
  if (mm < 10) {
    mm = '0' + mm;
  } 
  return yyyy + '_' + mm + '_'+ dd; 
}



function remove_dimension_2d_array(array) {
  var newArr = [];
  for(var i = 0; i < array.length; i++) {
    newArr = newArr.concat(array[i]);
  }
  return newArr;
}


function percentile(arr, p) {
    if (arr.length === 0) return 0;
    if (typeof p !== 'number') throw new TypeError('p must be a number');
    if (p <= 0) return arr[0];
    if (p >= 1) return arr[arr.length - 1];
    var index = arr.length * p,
        lower = Math.floor(index),
        upper = lower + 1,
        weight = index % 1;

    if (upper >= arr.length) return arr[lower];
    return arr[lower] * (1 - weight) + arr[upper] * weight;
}


function create_file_in_folder(file_name, folder_id) {
  var doc = SpreadsheetApp.create(file_name);
  var docFile = DriveApp.getFileById(doc.getId());
  DriveApp.getFolderById(folder_id).addFile(docFile);
  DriveApp.getRootFolder().removeFile(docFile);
}


function generate_array_from_dict(dictionary) {
  var array_keys = new Array();
  var array_values = new Array();
  for (var key in dictionary) {
    array_keys.push(key);
    array_values.push(dictionary[key]);
  }
  return {
    array_keys: array_keys,
    array_values: array_values
  }
}


function generate_dict_from_array_of_bittrex(input_array) {
  var input_dict = {};
  for (var i = 0; i < input_array.length; i++) {
    input_dict[input_array[i][0]] = {
      'ask': input_array[i][8],
      'timestamp':  input_array[i][6] 
    };
  }
  return input_dict;
}


function arr_diff(a1, a2) {
  var a = [], diff = [];
  for (var i = 0; i < a1.length; i++) {
    a[a1[i]] = true;
  }
  for (var i = 0; i < a2.length; i++) {
    if (a[a2[i]]) {
      delete a[a2[i]];
    } else {
      a[a2[i]] = true;
    }
  }
  for (var k in a) {
    diff.push(k);
  }
  return diff;
}


function get_destination_spreadsheet(folder_id, file_name) {
  var folder = DriveApp.getFolderById(folder_id);
  var historical_files = folder.getFiles();
  while (historical_files.hasNext()) {
    var file = historical_files.next();
    if (file.getName() == file_name) {
      return file.getId();
    }
  }
  return create_ss_in_folder(folder_id, file_name);
}



function install_triggers_minutes(function_name, minutes) {
  ScriptApp.newTrigger(function_name).timeBased().everyMinutes(5).create();
}


function count_occurrences_in_array(array, value) {
  var count = array.reduce(function(n, val) {
    return n + (val === value);
  }, 0);
  return count;
}


function create_ss_in_folder(folder_id, file_name) {
  var folder = DriveApp.getFolderById(folder_id);
  var file = SpreadsheetApp.create(file_name);
  var copyFile = DriveApp.getFileById(file.getId());
  folder.addFile(copyFile);
  DriveApp.getRootFolder().removeFile(copyFile);
  return file.getId();
}


function average_from_array(array) {
  var sum = 0;
  for( var i = 0; i < array.length; i++ ){
    sum += array[i]; //don't forget to add the base
  }
  return sum/array.length; 
}


function convert_decimal_to_percentage(decimal) {
  return parseFloat(decimal * 100).toFixed(2);
}



function get_max_from_array(array) {
  return array.reduce(function(a, b) {
    return Math.max(a, b);
  }); 
}


function get_min_from_array(array) {
  return array.reduce(function(a, b) {
    return Math.min(a, b);
  }); 
}

function getFirstEmptyRow(sheet, column) {
  sheet.appendRow([null]);
  var last_row = sheet.getLastRow() + 1;
  var column = sheet.getRange(1, column, last_row);
  var values = column.getValues();
  var iterator = 0;
  while (values[iterator][0] != "") {
    iterator++;
  }
  sheet.deleteRow(last_row);
  return iterator;
}


function convert_time_stamp_to_date(time_stamp) {
  if (time_stamp.length == 20) {time_stamp = time_stamp + '000';}
  if (time_stamp.length == 21) {time_stamp = time_stamp + '00';}
  if (time_stamp.length == 22) {time_stamp = time_stamp + '0';}
  var date = new Date(time_stamp);
  date.setHours(date.getHours() + 1);
  return Utilities.formatDate(date, 'Europe/Berlin', 'MM/dd/yyyy HH:mm:ss');
}

function cleanArray(actual) {
  var newArray = new Array();
  for (var i = 0; i < actual.length; i++) {
    if (actual[i] != '#NUM!') {
      if (actual[i]) {
        newArray.push(actual[i]);
      }
    }
  }
  return newArray;
}
