import axios from 'axios'
//拼接get请求的参数
const queryGetParamsUrl = (query) => {
    let params = []
    console.log(query)
    // console.log(query)
    for (var i in query) {
        if (query[i]) {
            params.push(`${i}=${query[i]}`)
        }
    }
    return params.join('&')
}

const AccordingName_findID = (el, name) => {  //根据name查找id   el被查找的元素  name需要查找名字
    if (name) {
        console.log(name)
        let findIndex = el.findIndex(item => {

            return item.label == name || item.name == name
        })
        console.log(el)
        return el[findIndex] && el[findIndex].id
    } else {
        return ''
    }

}


const getPro = () => {  //获取省份
    return new Promise((resolve, reject) => {
        axios.get('agent/reg/regPro').then(res => {
            resolve(res.data || [])
        }).catch(err => {
            reject(err)
        })
    })
}

const GET_City = (id) => {   //获取市
    return new Promise((resolve, reject) => {
        axios.post('agent/reg/regCity', { id: id }).then(res => {
            let data = res.data || [];
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}

const get_County = (id) => {  //获取区/县
    return new Promise((resolve, reject) => {
        axios.post('agent/reg/regCounty', {
            id: id
        })
            .then(res => {
                resolve(res.data || [])
            })
            .catch(error => {
                reject(error)
            });
    })
}



const datetime = (timestamp) => {  //把时间戳转化成时间格式
    if (timestamp == "") return "--"
    timestamp = new Date(timestamp).getTime()
    var date = new Date(timestamp.toString().length == 13 ? timestamp : timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}

const getTime = (date) => {
    return {
        start_time: date && date[0] ? datetime(date[0]) : '',
        end_time: date && date[1] ? datetime(date[1]) : ''
    }
}


export {
    queryGetParamsUrl,
    getPro,
    GET_City,
    get_County,
    AccordingName_findID,
    datetime,
    getTime
}