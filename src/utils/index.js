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

export {
    queryGetParamsUrl,
    getPro,
    GET_City,
    get_County,
    AccordingName_findID
}