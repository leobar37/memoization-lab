export const init = () => {
  const container = document.getElementById("root");
  container.innerHTML = `<div class="console">
    <h3 class="headline">Memoization</h3>
      <div id="prints">
        
      </div>
   </div>`;
  container.classList.add("display");
};

export const log = (...args: any[]) => {
  const container = document.getElementById("prints");
  const line = document.createElement("pre");
  line.classList.add("line");
  line.innerHTML = `
    <code>
       ${args.join(" ")}
    </code>
    `;
  container.appendChild(line);
};
