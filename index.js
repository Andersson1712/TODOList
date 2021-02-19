const newTask = document.getElementById('newTask')
const modalNewTask = document.getElementById('modalNewTask')
const containerTask = document.getElementById('containerTask')
const submit = document.getElementById('submit')
const taskContent = document.querySelector('.taskContent')
const template = document.querySelector('template').content
const fragment = document.createDocumentFragment()
let Tasks = []




// events
containerTask.addEventListener('click',(e)=>{
    let comparation = e.target.classList.value

    switch (comparation) {
        case 'delete':
            deleteTask(e.target.value)
        break
        case 'complete':
            completeTask(e.target)
        break
    
        default:
            break
    }
        e.stopPropagation()   
})


newTask.addEventListener('click',()=>{
    modalNewTask.style.display='flex'
   
})

submit.addEventListener('click',(e)=>{
    if(e.which == 1 || e.which == 13){
        e.preventDefault()
        const input = submit.previousElementSibling
        addTask(input.value)
        input.value=''
        modalNewTask.style.display='none'
        showTask()
    }
})
document.addEventListener('DOMContentLoaded',()=>{
    if(localStorage.getItem('Tasks')){
        Tasks = JSON.parse(localStorage.getItem('Tasks'))
        showTask()
    }

   
})


//functions

const addTask = (Task)=>{
    Tasks.unshift(Task)
    localStorage.setItem('Tasks', JSON.stringify(Tasks))
    console.log(Tasks)
}

const showTask = ()=>{
    containerTask.innerHTML=''
    Tasks.forEach( Task => {
        const clone = template.cloneNode(true)
        clone.querySelector('p').textContent = Task
        clone.querySelector(".delete").value = Task
        fragment.appendChild(clone)  
    })
        containerTask.appendChild(fragment)
}
const deleteTask = (Task, e) =>{
    
    if(Tasks.indexOf(JSON.stringify(Task))){
        let i = JSON.stringify(Task)
        Tasks.splice(i, 1)
        localStorage.setItem('Tasks', JSON.stringify(Tasks))
        showTask()
    }
    
}
const completeTask = (Task) =>{
    Task.parentElement.previousElementSibling.children[0].classList.add('p')
    console.log(Task.parentElement.previousElementSibling.children[0])
    Task.parentElement.parentElement.style.backgroundColor = 'coral'
}