const json = './videos.json';

const accordion = document.getElementById('youtubeList');

initialize();

async function initialize() {
    const request = await fetch(json);
    const response = await request.json();
    console.log(response);
    const keys = Object.keys(response);
    keys.forEach(key => {
        const headingID = 'heading' + key.replaceAll(' ', '');
        const collapseID = 'collapse' + key.replaceAll(' ', '');

        const accordionItem = document.createElement('div');
        accordionItem.className = 'accordion-item';
        accordion.appendChild(accordionItem);
        const h2 = document.createElement('h2');
        h2.className = 'accordion-header';
        h2.id = headingID
        accordionItem.appendChild(h2);
        const btn = document.createElement('button');
        btn.className = 'accordion-button collapsed';
        btn.type = 'button';
        btn.setAttribute('data-bs-toggle', 'collapse');
        btn.setAttribute('data-bs-target', '#' + collapseID);
        btn.ariaExpanded = true;
        btn.ariaControls = collapseID;
        btn.textContent = key;
        h2.appendChild(btn);

        const collapse = document.createElement('div');
        collapse.id = collapseID;
        collapse.className = 'accordion-collapse collapse';
        collapse.setAttribute('aria.labelledby', headingID);
        collapse.setAttribute('data-bs-parent', '#youtubeList');
        accordionItem.appendChild(collapse);
        const accordionBody = document.createElement('div');
        accordionBody.className = 'accordion-body';
        collapse.appendChild(accordionBody);

        const listGroup = document.createElement('div');
        listGroup.className = 'list-group mb-3';
        accordionBody.appendChild(listGroup);

        const child = response[key];
        const childKeys = Object.keys(child);
        childKeys.forEach(childKey => {
            if (childKey != 'ferramentas') {
                const link = document.createElement('a');
                link.href = child[childKey];
                link.className = 'list-group-item list-group-item-action';
                link.target = '_blank';
                listGroup.appendChild(link);
                const title = document.createElement('h3');
                title.className = 'fs-6';
                title.innerHTML = '<i class="fa-brands fa-youtube"></i> ' + childKey;
                link.appendChild(title);
            }
        });
        const ferramentas = child.ferramentas.split(";")
        console.log(ferramentas);
        const p = document.createElement('p');
        accordionBody.appendChild(p);
        const span = document.createElement('span');
        span.textContent = 'Ferramentas: ';
        span.className = 'fw-bold';
        p.appendChild(span);
        const tools = ferramentas.join(', ');
        p.innerHTML += tools;

    });
}