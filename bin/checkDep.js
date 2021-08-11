const  depcheck = require("depcheck");
const  path = require("path");
const  readline = require("readline");
const  child_process = require("child_process");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

( async function checkDependency(){
    const dep = await depcheck(path.join(path.resolve(__dirname), '../'), {})

    if (dep.dependencies){
        rl.question('The unusual package founded. Do you to remove it? (yes, no)> ', async (response)=>{
            switch (response){
                case 'yes':
                    for (const dependency of dep.dependencies){
                        await child_process.exec('npm uninstall ' + dependency, function (err, stdout, stderr){
                            if (err)
                                console.log('ERROR : ' + err);
                        else
                            console.log('STDOUT : ' + stdout)
                        });
                    }
                    console.log('Packages uninstalled with success.')
                    break;
                case 'no':
                    console.log('Okay...')
                    rl.close();
                    break;
                default :
                    console.error('invalid choice.')
                    await checkDependency();
                    break;
            }
        });

   }
})();

