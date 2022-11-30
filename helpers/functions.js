import { useEffect, useState } from "react";
import React from 'react';
import baseApi from '../api/baseApi';
import { toast } from "react-toastify";
import * as XLSX from 'xlsx';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import axios from "axios";
import { Chart, ArcElement, LineElement, BarElement, PointElement, BarController, BubbleController, DoughnutController, LineController, PieController, PolarAreaController, RadarController, ScatterController, CategoryScale, LinearScale, LogarithmicScale, RadialLinearScale, TimeScale, TimeSeriesScale, Decimation, Filler, Legend, Title, Tooltip, SubTitle } from 'chart.js';


const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
    }
  };
  return [storedValue, setValue];
}
const objToFormData = (obj, form, namespace) => {
  const fd = form || new FormData();
  let formKey;
  for (let property in obj) {
    if (obj.hasOwnProperty(property) && obj[property]) {
      if (namespace) {
        formKey = namespace + '[' + property + ']';
      } else {
        formKey = property;
      }
      if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
        objToFormData(obj[property], fd, property);
      } else {
        fd.append(formKey, obj[property]);
      }
    }
  }
  return fd;
}

const onlyNumbers = (string) => {
  return string.replace(/\D/g, "");
}
const passwordify = (password) => {
  return password && password.replace(/./g, "*");
}
const downloadExcel = async (data) => {

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const wscols = [];
  for (let i = 0; i < data.length; i++) {
    wscols.push({ wch: 20 });
  }
  worksheet["!cols"] = wscols;
  XLSX.writeFile(workbook, "DataSheet.xlsx");
};


const useGet = (url, needSessionID, firstAction, thenAction, catchAction, finalAction, dependencies = []) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    firstAction && firstAction();
    baseApi.get(url + (needSessionID ? '?session_id=' + localStorage.getItem('sessionID') : ''))//`?session_id=${localStorage.getItem('sessionID')}` : ''))
      .then((res) => setData(res.data.data))
      .then((res) => thenAction && thenAction(res))
      .catch((err) => {
        (err) => toast.error(err.response.data.data)
        catchAction && catchAction()
      })
      .finally(finalAction && finalAction())
  }, [url]);
  return [data];
};

const apiPost = async (url, data, includeFile, thenAction, catchAction, finalAction, showToast = true) => {
  baseApi.post(url, includeFile ? await objToFormData(data) : data, includeFile && {
    headers: {
      "Content-Type": "multipart/form-data",
      //'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(async (res) => {
      if (res.data.success) {
        showToast && toast.success('Added Successfully')
        thenAction && thenAction(res)
      }
    })
    .catch((err) => {
      catchAction && catchAction(err)
      const errorMessage = err.response?.data?.data
      typeof errorMessage != 'string' ? err.response.data?.data?.map((item, index) => {
        toast.error(item)
      }) :
        toast.error(errorMessage)
    }
    )
    .finally(async () => {
      finalAction && finalAction()
      // loadTableData()
      // setSubmitting(false)
    }
    )
}
const apiPatch = async (url, data, includeFile, thenAction, catchAction, finalAction) => {
  baseApi.patch(url, includeFile ? await objToFormData(data) : data, includeFile && {
    headers: {
      "Content-Type": "multipart/form-data",
      //'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(async (res) => {
      // 
      if (res.data.success && res.data.data.affected >= 1) {
        toast.success('Editted Successfully')
        thenAction && thenAction(res)
      }
      // else toast.error('No Changes Made')
    })
    .catch((err) => {
      catchAction && catchAction(err)
      // 
      const errorMessage = err.response?.data?.data
      typeof errorMessage != 'string' ? err.response?.data?.data?.map((item, index) => {
        // 
        toast.error(item)
      }) :
        toast.error(errorMessage)
    }
    )
    .finally(async () => {
      finalAction && finalAction()
      // loadTableData()
      // setSubmitting(false)
    }
    )
}
const apiGet = async (url, includeFile, thenAction, catchAction, finalAction) => {


  const response = baseApi.get(url)
    .then(async (res) => {
      if (res.data?.success) {
        // data = res.data?.data
        // 
        thenAction && thenAction(res)
        return await res.data?.data
        // 
      }

    })
    .catch((err) => {
      catchAction && catchAction(err)
      const errorMessage = err.response?.data?.data
      // 
    }
    )
    .finally(() => {
      // 
      finalAction && finalAction()
    }
    )
  return response.data
}
const apiDelete = (url, id, thenAction, catchAction, finalAction) => {
  baseApi.delete(`${url + id}`)
    .then(async (res) => {
      if (res.data?.success) {
        thenAction && thenAction(res)
        toast.success('Deleted Successfully')
      }
    })
    .catch((err) => {
      catchAction && catchAction(err)
      const errorMessage = err.response.data?.data
      typeof errorMessage != 'string' ? err.response.data.data.map((item, index) => {
        toast.error(item)
      }) :
        toast.error(errorMessage)
    })
    .finally(() => {
      finalAction && finalAction()
    })
}

function capitalize(str) {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(' ');
}
const isPropValuesEqual = (subject, target, propNames) =>
  propNames.every(propName => subject[propName] === target[propName]);
const getUniqueItemsByProperties = (items, propNames) => {
  const propNamesArray = Array.from(propNames);
  return items.filter((item, index, array) =>
    index === array.findIndex(foundItem => isPropValuesEqual(foundItem, item, propNamesArray))
  );
};
let substractArrays = (one, two, filterBy) => one?.filter((item) => {
  return !two?.some((item2) => {
    //
    //
    return item2[filterBy] === item[filterBy];
  })
});




const catIdtoName = (id) => {
  switch (id) {
    case 1:
      return 'BIDĀYAH'
    case 2:
      return 'ʾŪLĀ '
    case 3:
      return 'THĀNIYAH'
    case 4:
      return 'THĀNAWIYYAH'
    case 5:
      return 'ʿᾹLIYAH'
    case 6:
      return 'KULLIYYA'
    case 7:
      return 'BIDAYAH'
    case 8:
      return 'ʾULA '
    case 9:
      return 'THANIYAH'
    case 10:
      return 'THANAWIYYAH'
    case 11:
      return 'ʿALIYAH'
    case 12:
      return 'KULLIYYA'
    default:
      return id
  }
}

const statusCodeToStatus = (code) => {
  switch (code) {
    case 'P':
      return 'Pending for review...'
    case 'N':
      return 'Not submitted'
    case 'A':
      return 'Approved'
    case 'R':
      return 'Rejected'
    default:
      return code
  }
}

//remove duplicates in an array of objects by id
const removeDuplicates = (arr, prop) => {
  return arr.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
}
const reverseArray = (arr) => {
  let newArr = []
  for (let i = arr.length - 1; i >= 0; i--) {
    newArr.push(arr[i])
  }
  return newArr
}

const uniqueInstitute = (arr, key, key2) => [...new Map(arr.map(item => [item[key][key2], item])).values()]

const sortArrayOfObjectsByProperty = (arr, prop, order) => {
  if (order === 'desc') {
    return arr.sort((a, b) => (parseInt(a[prop]) < parseInt(b[prop])) ? 1 : -1)
  }
  else {
    return arr.sort((a, b) => (parseInt(a[prop]) > parseInt(b[prop])) ? 1 : -1)
  }
}
const printElement = (elementId) => {
  const printJS = require('print-js')
  printJS(elementId, 'html')
}

const convertTableToExcel = async (tableId, title) => {
  const table = document.getElementById(tableId);
  const tableHeads = table.querySelectorAll('th');
  const tableRows = table.querySelectorAll('tr');
  const tableHeadsArray = Array.from(tableHeads).map((item) => item.innerText.toLowerCase() != 'action' && item.innerText.toLowerCase() != 'actions' && item.innerText.toLowerCase() != '' && item.innerText);
  const tableRowsArray = Array.from(tableRows).map((item) => {
    return Array.from(item.querySelectorAll('td')).map((item) => {
      if (item.querySelector('button')) {
        return null
      } else {
        return stringToFloatIfConvertible(item.innerText)
      }
    })

  }
  )
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('Sheet 1');
  worksheet.columns = tableHeadsArray.map((item) => {
    return { header: item, key: removeSpacesAndSpecialChars(item), width: item.length + 5 }
  })
  worksheet.addRows(tableRowsArray)
  worksheet.insertRow(1)
  worksheet.mergeCells(1, 1, 1, tableHeadsArray.length)
  worksheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' }
  worksheet.getCell('A1').font = { size: 16, bold: true }
  worksheet.getRow(1).height = 150
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      }
    })
  })
  //bold second row
  worksheet.getRow(2).font = { bold: true, size: 12 }
  worksheet.getRow(2).eachCell((cell, colNumber) => {
    cell.border = {
      top: { style: 'thick' },
      left: { style: 'thick' },
      bottom: { style: 'thick' },
      right: { style: 'thick' }
    }
  })
  worksheet.columns.forEach(column => {
    column.width = column.width ?? 10;
    column.eachCell({ includeEmpty: true }, cell => {
      const length = cell.value?.length ?? 10;
      if (column.width < length) {
        column.width = length + 5;
      }
    });
  });
  worksheet.getCell('A1').value = title;
  await workbook.xlsx.writeBuffer().then((data) => {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, title + '.xlsx');
  })
}


const stringToFloatIfConvertible = (str) => {
  if (str.match(/^[0-9.]+$/)) {
    return parseFloat(str)
  }
  else {
    return str
  }
}
const removeSpacesAndSpecialChars = (str) => {
  return str && str?.replace(/[^a-zA-Z0-9]/g, '')
}

async function checkImage(url) {
  axios.get(url).then(() =>
    true
  ).catch((err) => {
    return false
  })
}
const convertObjToSelectData = (arr, valueKey, labelKey) => {
  return arr.map((item) => {
    return { value: item[valueKey], label: item[labelKey] }
  })
}
const timeToAgo = (time) => {
  try {
    const timeAgo = require('javascript-time-ago')
    const en = require('javascript-time-ago/locale/en')
    timeAgo.addLocale(en)
    const timeAgoInstance = new timeAgo('en-US')
    return timeAgoInstance.format(new Date(time))
  } catch (e) {
    return ""
  }
}

const formatDate = (dateString, toggleMtoD, showTime) => {
  // return new Date(dateString).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit' })
  if (showTime) return new Date(toggleMtoD ? toggleMonthAndDay(dateString) : dateString)
    .toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit', hour12: true, hour: 'numeric', minute: 'numeric' })
  else return new Date(toggleMtoD ? toggleMonthAndDay(dateString) : dateString)
    .toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit' })
}
const toggleMonthAndDay = (dateString) => {
  // dd-mm-yyyy to mm-dd-yyyy
  const dateArray = dateString.split('-')
  return dateArray[1] + '-' + dateArray[0] + '-' + dateArray[2]
}

const convertLongPosToShort = (longPos) => {
  // first = 1st, second = 2nd, third = 3rd
  if (longPos === 'First') return '1st'
  else if (longPos === 'Second') return '2nd'
  else if (longPos === 'Third') return '3rd'
  else return longPos
}



const LoadBarChart = (chartId, labels, counts, title, xLabel, yLabel) => {
  let chartStatus = Chart.getChart(chartId); // <canvas> id
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }
  Chart.register(ArcElement, LineElement, BarElement, PointElement, BarController, BubbleController, DoughnutController, LineController, PieController, PolarAreaController, RadarController, ScatterController, CategoryScale, LinearScale, LogarithmicScale, RadialLinearScale, TimeScale, TimeSeriesScale, Decimation, Filler, Legend, Title, Tooltip, SubTitle);
  const chart_config = {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: title,
        data: counts,
        backgroundColor: [
          '#8e548f',
          '#a569b0'
        ],
        borderColor: [
          '#8e548f',
          '#a569b0'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          // beginAtZero: true,
          title: {
            display: true,
            text: yLabel ? yLabel : ''
          }
        },
        x: {
          title: {
            display: true,
            text: xLabel ? xLabel : ''
          }
        }
      }
    }
  }
  const ctx = document.getElementById(chartId).getContext('2d');
  // try {
  const myChart = new Chart(ctx, chart_config);
  // }
  // catch (err) {
  //   console.log('error', err)
  // }
  // myChart?.destroy()
}
const getFirstFive = (arr) => {
  return arr.slice(0, 5)
}

const addHourToDate = (date, hour) => {
  return new Date(date).setHours(new Date(date).getHours() + hour)
}

const onKeyDown = (e, cellNumer, index) => {
  if (e.key === "Enter" || e.key === "Tab" || e.key === "ArrowDown") {

    e.preventDefault();
    let nextInput =
      document.getElementById("candidatesTable").rows[index + 2]?.cells[
        cellNumer
      ].children[0];
    nextInput?.focus();
    nextInput?.select();
  }
  // arrow right
  if (e.key === "ArrowRight") {


    e.preventDefault();
    let nextInput =
      document.getElementById("candidatesTable").rows[index + 1]?.cells[
        cellNumer + 1
      ]?.children[0];
    nextInput?.focus();
  }
  // arrow left
  if (e.key === "ArrowLeft") {
    e.preventDefault();
    let nextInput =
      document.getElementById("candidatesTable").rows[index + 1]?.cells[
        cellNumer - 1
      ]?.children[0];
    nextInput?.focus();
  }
  // arrow up
  if (e.key === "ArrowUp") {
    e.preventDefault();
    let nextInput =
      document.getElementById("candidatesTable").rows[index]?.cells[
        cellNumer
      ]?.children[0];
    nextInput?.focus();
  }
}
const replaceHyphenWithBreak = (str) => {
  return str?.replace(/-/g, `\n`)
}

const share = (url , title, text) => {
  if (navigator.share) {
    navigator.share({
      title: title ? title : 'Share',
      text: text ? text : 'Share', 
      url: url,
    })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
  }
}




const BaseApi = baseApi
export {
  share,
  replaceHyphenWithBreak,
  addHourToDate,
  getFirstFive,
  LoadBarChart,
  convertLongPosToShort,
  toggleMonthAndDay,
  BaseApi,
  formatDate,
  timeToAgo,
  removeSpacesAndSpecialChars,
  convertObjToSelectData,
  checkImage,
  convertTableToExcel,
  printElement,
  sortArrayOfObjectsByProperty,
  reverseArray,
  removeDuplicates,
  uniqueInstitute,
  statusCodeToStatus,
  catIdtoName,
  substractArrays,
  useLocalStorage,
  objToFormData,
  onlyNumbers,
  useGet,
  apiPost,
  apiPatch,
  apiDelete,
  downloadExcel,
  capitalize,
  passwordify,
  apiGet,
  onKeyDown,
};