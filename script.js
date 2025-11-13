const apiUrl = 'http://localhost:3000/tasks';

const form = document.getElementById ('task-form');
const tasklist = document.getElementById('task-list');

form.addEventListener ('submit', async (e) => {
    e.preventDefault();
      
      const title = document.getElementById('title').value;
      const description = document.getElementById ('description').value;
      
      try {
       const res  = await fetch( apiUrl, {
         method: 'POST',
         headers: {'Content-type': 'application/json'}, 
         body: JSON.stringify({title,descrição})
         })
       
        if(!res.ok) throw new Error("Erro ao adicionar tarefa");

        const task = await res.json();
        form.reset();
        addTaskToUl(task);

    }  catch (error) {
       alert("erro ao salvar tarefa: " + error.message);

      }
      
});

function addTaskToUl(task) {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
    <span>${task.title} - ${task.description}</span> 
    <div>
    <button onClick="toggleCompleted(${task.id}, ${task.
        completed})">
        ✅
        </button>
        <button onClick="deleteTask(${task.id})">🗑️</button>
        </div>
    `;
    tasklist.appendChild(li);
}

async function loadTasks() {
    try {
        const res = await fetch(apiUrl);
        if(!res.ok) throw new Error("Erro ao carregar tarefas");

        const task = await res.json();
        taskList.innerHTML = "";
        tasklist.onbeforematch(addTaskToUl);
    } catch (erro) {
      alert("Erro ao carregar tarefas: " + error.message);
    }

}

async function toggleCompleted(id, completed){
    try {
    await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: {"content-Type": "application/jason"},
        body: JSON.stringify({completed: !completed})
    });
    loadTasks();
    } catch (erro){
      alert("Erro ao atualizar tarefa: " + error.message);
    }
}

async function deleteTask(id) {
    try {
        await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        })
        loadTasks();
    } catch (erro) {
      alert("Erro ao excluir tarefa: " + error.message);
    }
}

loadTasks();
 



