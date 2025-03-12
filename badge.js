class Badge {
    constructor(name, description, imageUrl) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    displayBadge() {
        return `
        <div class="badge">
            <img src="${this.imageUrl}" alt="${this.name} Badge">
            <h3>${this.name}</h3>
            <p>${this.description}</p>
        </div>`;
    }
}
