import axios from 'axios'

export const handeQuene = (res) =>{
    res = res || []

    const requestQueue = (concurrency) =>{
        concurrency = concurrency || 6
        let queue = [] //请求队列
        let current = 0 //当前并发数
        const dequeue = () =>{
            while(current < concurrency && queue.length){ //当并发数小于最大并发数并且队列中还有请求时
                current++
                const requestPromiseFactory = queue.shift() //取出队列中的请求
                requestPromiseFactory().then((a)=>{ //成功的请求逻辑
                    console.log('成功',a)
                }).catch(error=>{ //失败的逻辑
                 console.log(error)
                }).finally(()=>{
                    current--
                    dequeue()
                })

            }
        }
        return (requestPromiseFactory)=>{
            queue.push(requestPromiseFactory) //将请求加入队列
            dequeue() //开始请求，，
        }
    }
    const enqueu = requestQueue(6)
for(let i = 0; i<res.length;i++){
    enqueu(()=>axios.get('/api/test'+i))
}
} 
