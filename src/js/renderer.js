window.addEventListener('DOMContentLoaded', async(event) => {
    console.log('DOMContentLoaded!!');
    //await window.myApi.testRequest() // 成功
    const setting = await Setting.load()
    console.log(setting)
    const git = new Git(setting?.github)
    const hub = new GitHub(setting?.github)

    // Axios APIを使うと必ず「An object could not be cloned.」エラーになる
    /*
    // Uncaught (in promise) Error: Error invoking remote method 'axiosGetUser': Error: An object could not be cloned.
    const res = await window.myApi.axiosGetUser()
    console.log(res)
    */
    /*
    // Uncaught (in promise) Error: Error invoking remote method 'axiosGet2': Error: An object could not be cloned.
    const res = await window.myApi.axiosGet2(`https://api.github.com/user`)
    console.log(res)
    */
    /*
    // Uncaught (in promise) Error: Error invoking remote method 'axiosGet': Error: An object could not be cloned.
    const res = await window.myApi.axiosGet(
        `https://api.github.com/user`,
        {
            'headers': {
                'Authorization': `token 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`,
                'Content-Type': 'application/json',
            }
        }
    )
    console.log(res)
    return
    */

    if (setting?.github?.repo) {
        console.log(setting?.github?.repo)
        document.getElementById('github-repo').value = setting.github.repo
        const exists = await git.init(document.getElementById('github-repo').value)
        if (!exists) {
            console.log(`リクエスト開始`)
            console.log(setting.github.username)
            console.log(setting.github.token)
            console.log(setting.github.repo)

            // electron-fetch
            // Uncaught (in promise) Error: Error invoking remote method 'fetch': Error: An object could not be cloned.
            // エラーになるけどWebAPIは成功しているらしくリモートリポジトリ作成される
            const res = await window.myApi.fetch(
                `https://api.github.com/user/repos`,
                {
                    'method': 'POST',
                    'headers': {
                        'Authorization': `token ${setting.github.token}`,
                        'User-Agent': `${setting.github.username}`,
                        'Content-Type': 'application/json',
                    },
                    'body': JSON.stringify({
                        'name': `${setting.github.repo}`,
                        'description': 'リポジトリの説明',
                    }),
                },
            )
            console.log(res)
            /*
            // Error.1
            // Uncaught (in promise) Error: Error invoking remote method 'axiosPost': Error: An object could not be cloned.
            // オブジェクトキーが文字列型でないと上記エラーになる
            // Error.2
            // Error: Error invoking remote method 'axiosPost': Error: An object could not be cloned.
            // APIの実行には成功しておりリモートリポジトリが作成されている
            // ならこのエラーは一体なんなの？　謎
            // ちなみに作成済みなのにもう一度実行すると422エラーになる。同名リポジトリが存在するとき422エラーになるっぽい。
            const res = await window.myApi.axiosPost(
                `https://api.github.com/user/repos`,
                {
                    //'name': setting.github.repo,
                    'name': `${setting.github.repo}`,
                    'description': 'リポジトリの説明',
                },
                {
                    'headers': {
                        'Authorization': `token ${setting.github.token}`,
                        //'User-Agent': setting.github.username,
                        'User-Agent': `${setting.github.username}`,
                        'Content-Type': 'application/json',
                    }
                }
            ).catch(e=>console.error(e));
            console.log(res)
            */
            /*
            //await window.myApi.createRepo2( // Uncaught (in promise) Error: An object could not be cloned.
            await window.myApi.createRepo(
                setting.github.username, 
                setting.github.token, 
                setting.github.repo, 
                'リポジトリの説明',
                (json, res)=>{
                    console.debug(res)
                    console.debug(json)
                    console.debug('GitHub リモートリポジトリ作成完了！')
                },
                (e)=>{
                    console.error(e)
                    console.debug('GitHub リモートリポジトリ作成失敗……')
                }
            )
            */
            /*
            await hub.createRepo({
                'name':setting.github.repo,
                'description':"リポジトリの説明",
                //homepage:"",// URL
                //private:false,// プライベートリポジトリ
                //auto_init:false,
                //gitignore_template:"",
                //license_template:"mit",
            })
            */
        }
    }
    /*
    if (setting?.github?.token) {
        document.getElementById('github-token').value = setting.github.token
        //await window.myApi.githubUser(setting.github.token) // 成功
        // 失敗：Uncaught (in promise) Error: An object could not be cloned
        await window.myApi.request({
            params: {
                method: 'GET',
                url: 'https://api.github.com/user',
                headers: {
                    'Authorization': `token ${setting.github.token}`,
                },
            },
        },(json, res)=>{
                console.debug(res)
                console.debug(json)
            },(res)=>{
                console.debug(res)
            })
    }
    */

    /*
    await window.myApi.loadDb(`src/db/mylog.db`)
    const db = new MyLogDb()
//    const downloader = new MyLogDownloader(db)
//    const uploader = new MyLogUploader(db, sqlFile)
    //const LENGTH = 140
    //const LINE = 15
    Loading.setup()
    const setting = await Setting.load()
    console.log(setting)
    console.log(setting?.mona?.address)
    //uploader.setup()
    if (setting?.mona?.address) { document.getElementById('address').value = setting.mona.address }
    if (setting?.github?.username) { document.getElementById('github-username').value =  setting?.github?.username }
    if (setting?.github?.token) { document.getElementById('github-token').value = setting?.github?.token }
    if (setting?.github?.repository) { document.getElementById('github-repository').value = setting?.github?.repository }
    const params = {
        params: {
            method: 'GET',
            url: `https://api.github.com/users/${setting.github.username}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + setting.github.token,
            },
        },
        onData:async(json, res)=>{
            console.debug(res)
            console.debug(json)
        },
        onEnd:async(res)=>{
            console.debug(res)
        },
    }
    console.log(params)
    await window.myApi.request(params) // Uncaught (in promise) Error: An object could not be cloned.
    document.getElementById('post-list').innerHTML = await db.toHtml(document.getElementById('address').value)
    document.getElementById('content').focus()
    document.getElementById('content-length').textContent = db.LENGTH;
    document.querySelector('#post').addEventListener('click', async()=>{
        document.getElementById('post-list').innerHTML = 
            db.insert(document.getElementById('content').value)
            + document.getElementById('post-list').innerHTML
    })
    document.querySelector('#delete').addEventListener('click', async()=>{
        const ids = Array.from(document.querySelectorAll(`#post-list input[type=checkbox][name=delete]:checked`)).map(d=>parseInt(d.value))
        console.debug(ids)
        await db.delete(ids)
        document.getElementById('post-list').innerHTML = await db.toHtml()
    })
    */
    /*
    document.querySelector('#download')?.addEventListener('click', async()=>{
        await downloader.download()
    })
    */
    /*
    document.querySelector('#save-setting').addEventListener('click', async()=>{
        await Setting.save(
            {
                mona:{address:document.getElementById('address').value},
                github:{
                    username:document.getElementById('github-username').value,
                    token:document.getElementById('github-token').value,
                    repository:document.getElementById('github-repository').value,
                }
            })
    })
    */
})
