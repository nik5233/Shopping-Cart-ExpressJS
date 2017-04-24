var Product = require('./products');
var mongoose = require('mongoose');
var url = require('../config/app.config')['development'].db.url();

mongoose.connect(url, () => {
    console.log(`Connected with DataBase: ${url}`);
    console.log(`===================================================================`);
});

var products = [
    new Product({
        system: {
            min: {
                cpu: '3.0 GHz dual core or better.',
                video: 'NVIDIA GeForce GTX 460 or better.',
                vram: '512 MB',
                ram: '2 GB',
                hdd: '9 GB',
                dx: 'DirectX 10',
                os: 'Windows Vista / Windows 7'
            },
            rec: {
                cpu: '2.4 GHz quad core or better.',
                video: 'NVIDIA GeForce GTX 460 or better.',
                vram: '1 GB',
                ram: '4 GB',
                hdd: '9 GB',
                dx: 'DirectX 11',
                os: 'Windows Vista / Windows 7'
            }
        },
        reviews: [{
            addition: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores id molestias ad unde a illum neque vel illo, odio sint quo numquam repudiandae, optio at nihil laborum fugiat inventore iusto!',
            relevante: {
                yes: 2,
                no: 10,
            },
            author: {
                userId: '58addb1bd435320011240ac6',
                username: 'Will',
            },
            rating: 3,
            city: 'Moscow'
        }, {
            goodSide: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum magnam ipsum, amet.',
            addition: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores id molestias ad unde a illum neque vel illo, odio sint quo numquam repudiandae, optio at nihil laborum fugiat inventore iusto!',
            relevante: {
                yes: 5,
                no: 1,
            },
            author: {
                userId: '58addb2ed435320011240ac7',
                username: 'Piter',
            },
            rating: 4,
            city: 'Moscow'
        }, {
            badSide: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, animi!',
            addition: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores id molestias ad unde a illum neque vel illo, odio sint quo numquam repudiandae, optio at nihil laborum fugiat inventore iusto!',
            relevante: {
                yes: 15,
                no: 3,
            },
            author: {
                userId: '58adc944226c321fc81a6cbf',
                username: 'Jhon',
                isShow: false
            },
            rating: 4,
            city: 'Moscow'
        }],
        qrCode: '1354946198621324',
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/6/65/Dishonored_box_art_Bethesda.jpg',
        imageHDPath: 'http://www.quneplay.de/wp-content/uploads/2016/03/dishonored-screenshot-00001.jpg',
        title: 'Dishonored',
        // category: 'games',
        tags: ['action', 'rpg', 'adventure', 'dishonored', 'bethesda'],
        description: 'Dishonored is a 2012 stealth action-adventure video game developed by Arkane Studios and published by Bethesda Softworks. It was released worldwide in October 2012 for Microsoft Windows, PlayStation 3, and Xbox 360. Set in the fictional, plague-ridden industrial city of Dunwall, Dishonored follows the story of Corvo Attano, bodyguard to the Empress of the Isles. He is framed for her murder and forced to become an assassin, seeking revenge on those who conspired against him. Corvo is aided in his quest by the Loyalists—a resistance group fighting to reclaim Dunwall, and the Outsider—a powerful being who imbues Corvo with magical abilities. Several noted actors including Susan Sarandon, Brad Dourif, Carrie Fisher, Michael Madsen, Lena Headey and Chloë Grace Moretz provided voice work for the game.',
        developers: ['Bethesda'],
        price: 10,
        platforms: ['pc', 'xbox'],
        genre: ['action', 'rpg', 'adventure'],
        screenshots: [
            'http://killapenguin.com/227/gallery/medium/dishonored/dishonored-0438.jpg',
            'http://www.defanet.it/images/dishonored-2/dishonored-2_009.jpg',
            'http://www.dagonslair.com/wp-content/uploads/dishonored3.jpg'
        ]
    }),
    new Product({
        system: {
            min: {
                cpu: 'Quad core CPU more that Intel i5 1700.',
                video: 'GeForce GTX 780, Radeon R9 290X or better',
                vram: '4 GB',
                ram: '6 GB',
                hdd: '100 GB',
                dx: 'DirectX 11',
                os: 'Windows 7 service pack 1 (64 bit), or Windows 8 (64 bit)'
            },
            rec: {
                cpu: '2.4 GHz quad core or better.',
                video: 'GeForce GTX 780, Radeon R9 290X or better',
                vram: '4 GB',
                ram: '8 GB',
                hdd: '100 GB',
                dx: 'DirectX 11',
                os: 'Windows 7 service pack 1 (64 bit), or Windows 8 (64 bit)'
            }
        },
        reviews: [{
            addition: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores id molestias ad unde a illum neque vel illo, odio sint quo numquam repudiandae, optio at nihil laborum fugiat inventore iusto!',
            relevante: {
                yes: 9,
                no: 2,
            },
            author: {
                userId: '58addb1bd435320011240ac6',
                username: 'Will',
            },
            rating: 5,
            city: 'Moscow'
        }, {
            goodSide: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum magnam ipsum, amet.',
            addition: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores id molestias ad unde a illum neque vel illo, odio sint quo numquam repudiandae, optio at nihil laborum fugiat inventore iusto!',
            relevante: {
                yes: 5,
                no: 1,
            },
            author: {
                userId: '58addb2ed435320011240ac7',
                username: 'Piter',
            },
            rating: 4,
            city: 'Moscow'
        }, {
            badSide: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, animi!',
            addition: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores id molestias ad unde a illum neque vel illo, odio sint quo numquam repudiandae, optio at nihil laborum fugiat inventore iusto!',
            relevante: {
                yes: 15,
                no: 3,
            },
            author: {
                userId: '58adc944226c321fc81a6cbf',
                username: 'Jhon',
                isShow: false
            },
            rating: 4,
            city: 'Moscow'
        }],
        qrCode: '1369756198621324',
        imageHDPath: 'http://blogs-images.forbes.com/jasonevangelho/files/2015/10/star-citizen1.jpg',
        // category: 'games',
        tags: ['action', 'rpg', 'simulator', 'star citizen', 'rsi'],
        developers: ['RSI'],
        platforms: ['pc', 'xbox'],
        genre: ['action', 'rpg', 'simulator'],
        screenshots: [
            'http://cdn3.dualshockers.com/wp-content/uploads/2014/04/StarCitizenDev_2014-04-11_14-10-10-26.jpg',
            'http://cdn.mos.cms.futurecdn.net/b7b3a11b8636db4ccea55ef8b3794852.jpeg',
            'https://cdn.mmos.com/wp-content/gallery/star-citizen-overview/Star-Citizen-Standing-Hanger.jpg'
        ],
        imagePath: 'https://static1.squarespace.com/static/55f0ff48e4b00ec05f25fd09/567fcf682399a36b8edef0bf/567fcf90a128e603baa0e628/1451216784801/star-citizen-box-art.jpg',
        title: 'Star Citizen',
        description: 'Star Citizen is an upcoming space sim video game for Microsoft Windows and Linux. Star Citizen is planned to consist of four main components: first-person space combat, mining, exploration, and trading with first-person shooter elements in a massively multiplayer persistent universe and customizable private servers, and a branching single-player and drop-in co-operative multiplayer campaign titled Squadron 42. The game is built on Amazon Lumberyard.',
        price: 35
    }),
    new Product({
        // addons: [{
        //     isSeparate: true,
        //     qrCode: '1354946177531344',
        //     imagePath: 'https://upload.wikimedia.org/wikipedia/en/2/28/Assassin%27s_Creed_IV_-_Black_Flag_cover.jpg',
        //     imageHDPath: 'https://cdn.techlegends.in/wp-content/uploads/2014/04/assassins_creed_4_black_flag_game_2-HD.jpg',
        //     title: 'Assassin\'s Creed IV: Black Flag',
        //     tags: ['action', 'assassin creed', 'black flag', 'ubisoft'],
        //     description: 'Assassin\'s Creed IV: Black Flag is a 2013 action-adventure video game developed by Ubisoft Montreal and published by Ubisoft. It is the sixth major installment in the Assassin\'s Creed series. Its historical timeframe precedes that of Assassin\'s Creed III (2012), though its modern-day sequences succeed III\'s own. Black Flag was first released on the PlayStation 3, Xbox 360, and Nintendo Wii U in October 2013 and a month later on the PlayStation 4, Microsoft Windows, and Xbox One.',
        //     price: 10,
        //     screenshots: [
        //         'https://i.ytimg.com/vi/KB7X686jKMA/maxresdefault.jpg',
        //         'http://cdn.escapistmagazine.com/media/global/images/library/deriv/545/545043.jpg',
        //         'https://i0.wp.com/www.adventuresinpoortaste.com/wp-content/uploads/2014/01/assassins-creed-iv-black-flag-3.jpg?fit=1920%2C1080'
        //     ],
        // }, {
        //     isSeparate: false,
        //     qrCode: '1354946177531314',
        //     imagePath: 'https://upload.wikimedia.org/wikipedia/en/2/28/Assassin%27s_Creed_IV_-_Black_Flag_cover.jpg',
        //     imageHDPath: 'https://cdn.techlegends.in/wp-content/uploads/2014/04/assassins_creed_4_black_flag_game_2-HD.jpg',
        //     title: 'Assassin\'s Creed IV: Black Flag',
        //     tags: ['action', 'assassin creed', 'black flag', 'ubisoft'],
        //     description: 'Assassin\'s Creed IV: Black Flag is a 2013 action-adventure video game developed by Ubisoft Montreal and published by Ubisoft. It is the sixth major installment in the Assassin\'s Creed series. Its historical timeframe precedes that of Assassin\'s Creed III (2012), though its modern-day sequences succeed III\'s own. Black Flag was first released on the PlayStation 3, Xbox 360, and Nintendo Wii U in October 2013 and a month later on the PlayStation 4, Microsoft Windows, and Xbox One.',
        //     price: 5,
        //     screenshots: [
        //         'https://i.ytimg.com/vi/KB7X686jKMA/maxresdefault.jpg',
        //         'http://cdn.escapistmagazine.com/media/global/images/library/deriv/545/545043.jpg',
        //         'https://i0.wp.com/www.adventuresinpoortaste.com/wp-content/uploads/2014/01/assassins-creed-iv-black-flag-3.jpg?fit=1920%2C1080'
        //     ],
        // }],
        system: {
            min: {
                cpu: '3.0 GHz dual core or better.',
                video: 'NVIDIA GeForce GTX 460 or better.',
                vram: '512 MB',
                ram: '2 GB',
                hdd: '9 GB',
                dx: 'DirectX 10',
                os: 'Windows Vista / Windows 7'
            },
            rec: {
                cpu: '2.4 GHz quad core or better.',
                video: 'NVIDIA GeForce GTX 460 or better.',
                vram: '1 GB',
                ram: '4 GB',
                hdd: '9 GB',
                dx: 'DirectX 11',
                os: 'Windows Vista / Windows 7'
            }
        },
        qrCode: '1354946177531324',
        imageHDPath: 'https://cdn.techlegends.in/wp-content/uploads/2014/04/assassins_creed_4_black_flag_game_2-HD.jpg',
        // category: 'games',
        tags: ['action', 'assassin creed', 'black flag', 'ubisoft'],
        developers: ['Ubisoft'],
        platforms: ['pc', 'xbox', 'psp'],
        genre: ['action'],
        stock: 42,
        screenshots: [
            'https://i.ytimg.com/vi/KB7X686jKMA/maxresdefault.jpg',
            'http://cdn.escapistmagazine.com/media/global/images/library/deriv/545/545043.jpg',
            'https://i0.wp.com/www.adventuresinpoortaste.com/wp-content/uploads/2014/01/assassins-creed-iv-black-flag-3.jpg?fit=1920%2C1080'
        ],
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/2/28/Assassin%27s_Creed_IV_-_Black_Flag_cover.jpg',
        title: 'Assassin\'s Creed IV: Black Flag',
        description: 'Assassin\'s Creed IV: Black Flag is a 2013 action-adventure video game developed by Ubisoft Montreal and published by Ubisoft. It is the sixth major installment in the Assassin\'s Creed series. Its historical timeframe precedes that of Assassin\'s Creed III (2012), though its modern-day sequences succeed III\'s own. Black Flag was first released on the PlayStation 3, Xbox 360, and Nintendo Wii U in October 2013 and a month later on the PlayStation 4, Microsoft Windows, and Xbox One.',
        price: 20
    }),
    new Product({
        // addons: [{
        //     isSeparate: true,
        //     qrCode: '1354946177531344',
        //     imagePath: 'https://upload.wikimedia.org/wikipedia/en/2/28/Assassin%27s_Creed_IV_-_Black_Flag_cover.jpg',
        //     imageHDPath: 'https://cdn.techlegends.in/wp-content/uploads/2014/04/assassins_creed_4_black_flag_game_2-HD.jpg',
        //     title: 'Assassin\'s Creed IV: Black Flag',
        //     tags: ['action', 'assassin creed', 'black flag', 'ubisoft'],
        //     description: 'Assassin\'s Creed IV: Black Flag is a 2013 action-adventure video game developed by Ubisoft Montreal and published by Ubisoft. It is the sixth major installment in the Assassin\'s Creed series. Its historical timeframe precedes that of Assassin\'s Creed III (2012), though its modern-day sequences succeed III\'s own. Black Flag was first released on the PlayStation 3, Xbox 360, and Nintendo Wii U in October 2013 and a month later on the PlayStation 4, Microsoft Windows, and Xbox One.',
        //     price: 10,
        //     screenshots: [
        //         'https://i.ytimg.com/vi/KB7X686jKMA/maxresdefault.jpg',
        //         'http://cdn.escapistmagazine.com/media/global/images/library/deriv/545/545043.jpg',
        //         'https://i0.wp.com/www.adventuresinpoortaste.com/wp-content/uploads/2014/01/assassins-creed-iv-black-flag-3.jpg?fit=1920%2C1080'
        //     ],
        // }, {
        //     isSeparate: false,
        //     qrCode: '1354946177531314',
        //     imagePath: 'https://upload.wikimedia.org/wikipedia/en/2/28/Assassin%27s_Creed_IV_-_Black_Flag_cover.jpg',
        //     imageHDPath: 'https://cdn.techlegends.in/wp-content/uploads/2014/04/assassins_creed_4_black_flag_game_2-HD.jpg',
        //     title: 'Assassin\'s Creed IV: Black Flag',
        //     tags: ['action', 'assassin creed', 'black flag', 'ubisoft'],
        //     description: 'Assassin\'s Creed IV: Black Flag is a 2013 action-adventure video game developed by Ubisoft Montreal and published by Ubisoft. It is the sixth major installment in the Assassin\'s Creed series. Its historical timeframe precedes that of Assassin\'s Creed III (2012), though its modern-day sequences succeed III\'s own. Black Flag was first released on the PlayStation 3, Xbox 360, and Nintendo Wii U in October 2013 and a month later on the PlayStation 4, Microsoft Windows, and Xbox One.',
        //     price: 5,
        //     screenshots: [
        //         'https://i.ytimg.com/vi/KB7X686jKMA/maxresdefault.jpg',
        //         'http://cdn.escapistmagazine.com/media/global/images/library/deriv/545/545043.jpg',
        //         'https://i0.wp.com/www.adventuresinpoortaste.com/wp-content/uploads/2014/01/assassins-creed-iv-black-flag-3.jpg?fit=1920%2C1080'
        //     ],
        // }],
        system: {
            min: {
                cpu: '3.0 GHz dual core or better.',
                video: 'NVIDIA GeForce GTX 460 or better.',
                vram: '512 MB',
                ram: '2 GB',
                hdd: '9 GB',
                dx: 'DirectX 10',
                os: 'Windows Vista / Windows 7'
            },
            rec: {
                cpu: '2.4 GHz quad core or better.',
                video: 'NVIDIA GeForce GTX 460 or better.',
                vram: '1 GB',
                ram: '4 GB',
                hdd: '9 GB',
                dx: 'DirectX 11',
                os: 'Windows Vista / Windows 7'
            }
        },
        stock: 42,
        reviews: [{
            addition: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores id molestias ad unde a illum neque vel illo, odio sint quo numquam repudiandae, optio at nihil laborum fugiat inventore iusto!',
            relevante: {
                yes: 2,
                no: 10,
            },
            author: {
                userId: '58addb1bd435320011240ac6',
                username: 'Will',
            },
            rating: 3,
            city: 'Moscow'
        }, {
            goodSide: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum magnam ipsum, amet.',
            addition: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores id molestias ad unde a illum neque vel illo, odio sint quo numquam repudiandae, optio at nihil laborum fugiat inventore iusto!',
            relevante: {
                yes: 5,
                no: 1,
            },
            author: {
                userId: '58addb2ed435320011240ac7',
                username: 'Piter',
            },
            rating: 4,
            city: 'Moscow'
        }, {
            badSide: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, animi!',
            addition: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores id molestias ad unde a illum neque vel illo, odio sint quo numquam repudiandae, optio at nihil laborum fugiat inventore iusto!',
            relevante: {
                yes: 15,
                no: 3,
            },
            author: {
                userId: '58adc944226c321fc81a6cbf',
                username: 'Jhon',
                isShow: false
            },
            rating: 4,
            city: 'Moscow'
        }],
        qrCode: '1354116198621324',
        imageHDPath: 'https://i.ytimg.com/vi/djW30f0tDX8/maxresdefault.jpg',
        // category: 'games',
        tags: ['action', 'rpg', 'division', 'tom clancys', 'ubisoft'],
        developers: ['Ubisoft'],
        platforms: ['pc', 'xbox', 'psp'],
        genre: ['action', 'rpg'],
        screenshots: [
            'https://i.ytimg.com/vi/WUQQvnSfbYA/maxresdefault.jpg',
            'https://cdn.division.zone/uploads/2015/12/the-division-player-stories-12-15-gameplay-17.jpg',
            'http://d1vnh8mbrp67em.cloudfront.net/image/file/2/14/77052/the_division_graphics.png'
        ],
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/03/The_Division_box.jpg/250px-The_Division_box.jpg',
        title: 'Tom Clancy\'s The Division',
        description: 'Tom Clancy\'s The Division is an online-only open world third-person shooter video game developed by Ubisoft Massive and published by Ubisoft, with assistance from Red Storm Entertainment, for Microsoft Windows, PlayStation 4 and Xbox One. It was announced during Ubisoft\'s E3 2013 press conference, and was released worldwide on 8 March 2016. The Division is set in a near future New York City in the aftermath of a smallpox pandemic; the player, who is an agent of the eponymous Strategic Homeland Division, commonly referred to as simply "The Division", is tasked with helping the group rebuild its operations in Manhattan, investigate the nature of the outbreak, and combating criminal activity in its wake. The Division is structured with elements of role-playing games, as well as collaborative and player versus player online multiplayer.',
        price: 25
    }),
    new Product({
        // addons: [{
        //     isSeparate: true,
        //     qrCode: '1354946177531344',
        //     imagePath: 'https://upload.wikimedia.org/wikipedia/en/2/28/Assassin%27s_Creed_IV_-_Black_Flag_cover.jpg',
        //     imageHDPath: 'https://cdn.techlegends.in/wp-content/uploads/2014/04/assassins_creed_4_black_flag_game_2-HD.jpg',
        //     title: 'Assassin\'s Creed IV: Black Flag',
        //     tags: ['action', 'assassin creed', 'black flag', 'ubisoft'],
        //     description: 'Assassin\'s Creed IV: Black Flag is a 2013 action-adventure video game developed by Ubisoft Montreal and published by Ubisoft. It is the sixth major installment in the Assassin\'s Creed series. Its historical timeframe precedes that of Assassin\'s Creed III (2012), though its modern-day sequences succeed III\'s own. Black Flag was first released on the PlayStation 3, Xbox 360, and Nintendo Wii U in October 2013 and a month later on the PlayStation 4, Microsoft Windows, and Xbox One.',
        //     price: 10,
        //     screenshots: [
        //         'https://i.ytimg.com/vi/KB7X686jKMA/maxresdefault.jpg',
        //         'http://cdn.escapistmagazine.com/media/global/images/library/deriv/545/545043.jpg',
        //         'https://i0.wp.com/www.adventuresinpoortaste.com/wp-content/uploads/2014/01/assassins-creed-iv-black-flag-3.jpg?fit=1920%2C1080'
        //     ],
        // }, {
        //     isSeparate: false,
        //     qrCode: '1354946177531314',
        //     imagePath: 'https://upload.wikimedia.org/wikipedia/en/2/28/Assassin%27s_Creed_IV_-_Black_Flag_cover.jpg',
        //     imageHDPath: 'https://cdn.techlegends.in/wp-content/uploads/2014/04/assassins_creed_4_black_flag_game_2-HD.jpg',
        //     title: 'Assassin\'s Creed IV: Black Flag',
        //     tags: ['action', 'assassin creed', 'black flag', 'ubisoft'],
        //     description: 'Assassin\'s Creed IV: Black Flag is a 2013 action-adventure video game developed by Ubisoft Montreal and published by Ubisoft. It is the sixth major installment in the Assassin\'s Creed series. Its historical timeframe precedes that of Assassin\'s Creed III (2012), though its modern-day sequences succeed III\'s own. Black Flag was first released on the PlayStation 3, Xbox 360, and Nintendo Wii U in October 2013 and a month later on the PlayStation 4, Microsoft Windows, and Xbox One.',
        //     price: 5,
        //     screenshots: [
        //         'https://i.ytimg.com/vi/KB7X686jKMA/maxresdefault.jpg',
        //         'http://cdn.escapistmagazine.com/media/global/images/library/deriv/545/545043.jpg',
        //         'https://i0.wp.com/www.adventuresinpoortaste.com/wp-content/uploads/2014/01/assassins-creed-iv-black-flag-3.jpg?fit=1920%2C1080'
        //     ],
        // }],
        system: {
            min: {
                cpu: '3.0 GHz dual core or better.',
                video: 'NVIDIA GeForce GTX 460 or better.',
                vram: '512 MB',
                ram: '2 GB',
                hdd: '9 GB',
                dx: 'DirectX 10',
                os: 'Windows Vista / Windows 7'
            },
            rec: {
                cpu: '2.4 GHz quad core or better.',
                video: 'NVIDIA GeForce GTX 460 or better.',
                vram: '1 GB',
                ram: '4 GB',
                hdd: '9 GB',
                dx: 'DirectX 11',
                os: 'Windows Vista / Windows 7'
            }
        },
        stock: 42,
        reviews: [{
            addition: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores id molestias ad unde a illum neque vel illo, odio sint quo numquam repudiandae, optio at nihil laborum fugiat inventore iusto!',
            relevante: {
                yes: 2,
                no: 10,
            },
            author: {
                userId: '58addb1bd435320011240ac6',
                username: 'Will',
            },
            rating: 3,
            city: 'Moscow'
        }, {
            goodSide: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum magnam ipsum, amet.',
            addition: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores id molestias ad unde a illum neque vel illo, odio sint quo numquam repudiandae, optio at nihil laborum fugiat inventore iusto!',
            relevante: {
                yes: 5,
                no: 1,
            },
            author: {
                userId: '58addb2ed435320011240ac7',
                username: 'Piter',
            },
            rating: 4,
            city: 'Moscow'
        }, {
            badSide: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, animi!',
            addition: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores id molestias ad unde a illum neque vel illo, odio sint quo numquam repudiandae, optio at nihil laborum fugiat inventore iusto!',
            relevante: {
                yes: 15,
                no: 3,
            },
            author: {
                userId: '58adc944226c321fc81a6cbf',
                username: 'Jhon',
                isShow: false
            },
            rating: 4,
            city: 'Moscow'
        }],
        qrCode: '1354942224621324',
        imageHDPath: 'http://cdn-press-start.scadigital.io/wp-content/uploads/2016/06/for-honor-site.jpg',
        // category: 'games',
        tags: ['action', 'rpg', 'for honor', 'ubisoft'],
        developers: ['Ubisoft'],
        platforms: ['pc', 'psp'],
        genre: ['action', 'rpg'],
        screenshots: [
            'https://i.ytimg.com/vi/Bu3uGwUiJbA/maxresdefault.jpg',
            'http://www.gamingsite.cz/wp-content/uploads/2016/04/for-honor-by.jpg',
            'http://thegamerholics.com/wp-content/uploads/2017/01/for-honor-2.jpg'
        ],
        imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d5/For_Honor_cover_art.jpg/250px-For_Honor_cover_art.jpg',
        title: 'For Honor',
        description: 'For Honor is an action fighting game developed by Ubisoft Montreal and published by Ubisoft for Microsoft Windows, PlayStation 4, and Xbox One. Reception of the game\'s open beta was mostly positive, with criticism being directed at the multiplayer matchmaking. Its melee combat system described as "The Art of Battle" by the developers and allows players to play the roles of historical soldiers such as medieval knights, samurai, and vikings within a medieval fantasy setting. Announced at Electronic Entertainment Expo 2015, For Honor was released worldwide on February 14, 2017.',
        price: 35
    })
];

var done = 0;
var i = products.length;
var timerId = setInterval(function() {
    products[i - 1].save((error, data) => {
        if (error) {
            console.log(`${error}`);
        } else {
            console.log(`#${i}. To "${data.collection.collectionName}" collection added: "${data.title}"`);
        }
        done++;
        i--;
        if (done === products.length) {
            clearInterval(timerId);
            mongoose.disconnect();
            console.log(`===================================================================`);
            console.log(`Disconnect with DataBase: ${url}`);
        }
    });
}, 1000);