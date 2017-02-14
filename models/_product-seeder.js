var Product = require('./products');
var mongoose = require('mongoose');
var url = require('./mongo.config');

mongoose.connect(url, () => {
    console.log(`Connected with DataBase: ${url}`);
    console.log(`===================================================================`);
});

var products = [
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/6/65/Dishonored_box_art_Bethesda.jpg',
        title: 'Dishonored',
        description: 'Dishonored is a 2012 stealth action-adventure video game developed by Arkane Studios and published by Bethesda Softworks. It was released worldwide in October 2012 for Microsoft Windows, PlayStation 3, and Xbox 360. Set in the fictional, plague-ridden industrial city of Dunwall, Dishonored follows the story of Corvo Attano, bodyguard to the Empress of the Isles. He is framed for her murder and forced to become an assassin, seeking revenge on those who conspired against him. Corvo is aided in his quest by the Loyalists—a resistance group fighting to reclaim Dunwall, and the Outsider—a powerful being who imbues Corvo with magical abilities. Several noted actors including Susan Sarandon, Brad Dourif, Carrie Fisher, Michael Madsen, Lena Headey and Chloë Grace Moretz provided voice work for the game.',
        price: 10
    }),
    new Product({
        imagePath: 'https://static1.squarespace.com/static/55f0ff48e4b00ec05f25fd09/567fcf682399a36b8edef0bf/567fcf90a128e603baa0e628/1451216784801/star-citizen-box-art.jpg',
        title: 'Star Citizen',
        description: 'Star Citizen is an upcoming space sim video game for Microsoft Windows and Linux. Star Citizen is planned to consist of four main components: first-person space combat, mining, exploration, and trading with first-person shooter elements in a massively multiplayer persistent universe and customizable private servers, and a branching single-player and drop-in co-operative multiplayer campaign titled Squadron 42. The game is built on Amazon Lumberyard.',
        price: 35
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/2/28/Assassin%27s_Creed_IV_-_Black_Flag_cover.jpg',
        title: 'Assassin\'s Creed IV: Black Flag',
        description: 'Assassin\'s Creed IV: Black Flag is a 2013 action-adventure video game developed by Ubisoft Montreal and published by Ubisoft. It is the sixth major installment in the Assassin\'s Creed series. Its historical timeframe precedes that of Assassin\'s Creed III (2012), though its modern-day sequences succeed III\'s own. Black Flag was first released on the PlayStation 3, Xbox 360, and Nintendo Wii U in October 2013 and a month later on the PlayStation 4, Microsoft Windows, and Xbox One.',
        price: 20
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/03/The_Division_box.jpg/250px-The_Division_box.jpg',
        title: 'Tom Clancy\'s The Division',
        description: 'Tom Clancy\'s The Division is an online-only open world third-person shooter video game developed by Ubisoft Massive and published by Ubisoft, with assistance from Red Storm Entertainment, for Microsoft Windows, PlayStation 4 and Xbox One. It was announced during Ubisoft\'s E3 2013 press conference, and was released worldwide on 8 March 2016. The Division is set in a near future New York City in the aftermath of a smallpox pandemic; the player, who is an agent of the eponymous Strategic Homeland Division, commonly referred to as simply "The Division", is tasked with helping the group rebuild its operations in Manhattan, investigate the nature of the outbreak, and combating criminal activity in its wake. The Division is structured with elements of role-playing games, as well as collaborative and player versus player online multiplayer.',
        price: 25
    }),
    new Product({
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d5/For_Honor_cover_art.jpg/250px-For_Honor_cover_art.jpg',
        title: 'For Honor',
        description: 'For Honor is an action fighting game developed by Ubisoft Montreal and published by Ubisoft for Microsoft Windows, PlayStation 4, and Xbox One. Reception of the game\'s open beta was mostly positive, with criticism being directed at the multiplayer matchmaking. Its melee combat system described as "The Art of Battle" by the developers and allows players to play the roles of historical soldiers such as medieval knights, samurai, and vikings within a medieval fantasy setting. Announced at Electronic Entertainment Expo 2015, For Honor was released worldwide on February 14, 2017.',
        price: 35
    })
];

var done = 0;
for (var i = products.length; i > 0; i--) {
    products[i - 1].save((error, data) => {
        if (error) {
            console.log(`${error}`);
        } else {
            console.log(`To "${data.collection.collectionName}" collection added: "${data.title}"`);
        }
        done++;
        if (done === products.length) {
            mongoose.disconnect();
            console.log(`===================================================================`);
            console.log(`Disconnect with DataBase: ${url}`);
        }
    });
}