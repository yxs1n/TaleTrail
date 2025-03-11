class Challenge {
    constructor(challengeName, goal, description, badge) {
        this.challengeName = challengeName;
        this.goal = goal;
        this.description = description;
        this.badge = badge; // Badge to award when completed
        this.participants = {};
    }

    joinChallenge(child) {
        if (!this.participants[child.id]) {
            this.participants[child.id] = 0;
            child.challenges.push(this.challengeName);
            return `${child.name} joined "${this.challengeName}" challenge!`;
        }
        return `${child.name} is already in this challenge.`;
    }

    updateProgress(child) {
        if (this.participants[child.id] !== undefined) {
            this.participants[child.id] = child.bookLogs.length;

            if (this.participants[child.id] >= this.goal) {
                child.addBadge(this.badge); // Award badge upon completion
                return `${child.name} completed "${this.challengeName}" and earned the '${this.badge.name}' badge!`;
            }

            return `${child.name}'s progress: ${this.participants[child.id]}/${this.goal}`;
        }
        return `${child.name} is not found in this challenge.`;
    }
}

