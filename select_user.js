document.getElementById("parentBtn").addEventListener("click", function() {
    fetch('/check_parent')
        .then(response => response.json())
        .then(data => {
            if (data.hasChildren) {
                window.location.href = "parent-home.html";
            } else {
                document.getElementById("addChildForm").classList.remove("hidden");
            }
        });
});

document.getElementById("childBtn").addEventListener("click", function() {
    window.location.href = "child-home.html";
});

document.getElementById("childForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const childName = document.getElementById("childName").value;

    fetch('/add_child', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: childName })
    }).then(() => {
        window.location.href = "parent-home.html";
    });
});
