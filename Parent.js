class Parent {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.children = []; // List of Child objects
    }


    addChild(child) {
        if (!this.children.includes(child)) {
            this.children.push(child);
        }
    }

    addBookLog(child, bookLog) {
        if (this.children.includes(child)) {
            child.addBookLog(bookLog);
        } else {
            console.log("Child not associated with this parent.");
        }
    }

    addChallenge(child, challenge) {
        if (this.children.includes(child)) {
            child.addChallenge(challenge);
        } else {
            console.log("Child not associated with this parent.");
        }
    }

    viewChildPathway(child) {
        if (this.children.includes(child)) {
            return child.viewPathway();
        } else {
            console.log("Child not associated with this parent.");
            return null;
        }
    }
}

export default Parent;