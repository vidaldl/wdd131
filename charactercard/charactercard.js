document.addEventListener('DOMContentLoaded', function() {
    // Create character object with properties and methods
    const character = {
        name: 'Snortleblat',
        class: 'Swamp Beast Diplomat',
        level: 5,
        health: 100,
        image: 'snortleblat.webp',
        
        attacked: function() {
            this.health -= 20;
            if (this.health <= 0) {
                this.health = 0;
                alert(`${this.name} has died!`);
            }
            this.updateDisplay();
        },
        
        levelUp: function() {
            this.level++;
            this.updateDisplay();
        },
        
        updateDisplay: function() {
            document.getElementById('health').textContent = this.health;
            document.getElementById('level').textContent = this.level;
        }
    };
    

    character.updateDisplay();
    
    // Add event listeners to buttons
    const attackedBtn = document.getElementById('attacked');
    const levelupBtn = document.getElementById('levelup');
    
    attackedBtn.addEventListener('click', function() {
        character.attacked();
    });
    
    levelupBtn.addEventListener('click', function() {
        character.levelUp();
    });
});
