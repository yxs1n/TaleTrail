class Badges {
    constructor() {
        this.badges = [
            { name: "Beginner", imageUrl: "images/beginner-badge.png", pages: 10 },
            { name: "Advanced", imageUrl: "images/advanced-badge.png", pages: 1000 },
            { name: "Expert", imageUrl: "images/expert-badge.png", pages: 2000 }
        ];
    }

    // Function to determine earned badges based on total pages read
    getEarnedBadges(totalPagesRead) {
    return this.badges.map(badge => ({
        ...badge,
        unlocked: totalPagesRead >= badge.pages
    }));
}

// Function to display all badges, with placeholders for locked ones
renderBadges(totalPagesRead) {
    const container = document.getElementById("badge-container");
    
    container.innerHTML = ""; // Clear previous badges
    const badges = this.getEarnedBadges(totalPagesRead);
    
    badges.forEach(badge => {

        const badgeElement = document.createElement("div");
        badgeElement.classList.add("badge");
        badgeElement.innerHTML = `
            <img src="${badge.unlocked ? badge.imageUrl : 'images/locked-badge.png'}" 
                 alt="${badge.name} Badge">
            <p>${badge.unlocked ? badge.name : "Locked"}</p>
        `;
        container.appendChild(badgeElement);
    });
}
}

export default Badges;