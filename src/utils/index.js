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


const getPro = () => {  //获取省份
    return new Promise((resolve, reject) => {
        axios.get('agent/reg/regPro').then(res => {
            resolve(res.data)
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

export {
    queryGetParamsUrl,
    getPro,
    GET_City
}