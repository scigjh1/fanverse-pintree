import { PrismaClient } from '../src/generated/prisma/index.js';
const db=new PrismaClient();
const now=new Date('2026-10-07T00:00:00Z');
const categories=[['fanverse-music','music','追星现场','官方音乐现场、舞台与艺人内容'],['fanverse-film','film','电影宇宙','电影 IP、官方预告与幕后内容'],['fanverse-games','games','游戏灵感','游戏世界、角色与官方艺术'],['fanverse-beauty','beauty','美妆灵感','品牌美学、香氛与产品创意']];
const links=[
 ['music','HYBE · 艺人宇宙','https://hybecorp.com/eng/main','从官方入口发现艺人、音乐与内容。','https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=85'],
 ['music','BLACKPINK · 官方内容','https://www.blackpinkofficial.com/','音乐、舞台与官方活动入口。','https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=85'],
 ['music','Billie Eilish · 音乐与影像','https://www.billieeilish.com/','官方音乐与视觉叙事入口。','https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=900&q=85'],
 ['music','Taylor Swift · 创作世界','https://www.taylorswift.com/','专辑、音乐与巡演官方信息。','https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=900&q=85'],
 ['film','A24 · 独立电影美学','https://a24films.com/','从电影制作方官网发现作品与幕后内容。','https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=85'],
 ['film','Studio Ghibli · 动画世界','https://www.ghibli.jp/','吉卜力官方作品、展览与资讯。','https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=900&q=85'],
 ['film','Marvel · 角色与故事','https://www.marvel.com/','从官方渠道探索电影与角色 IP。','https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&q=85'],
 ['film','Warner Bros · 幕后内容','https://www.warnerbros.com/','电影与系列作品的官方入口。','https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=85'],
 ['games','原神 · 官方世界','https://genshin.hoyoverse.com/','角色与世界观内容，收集游戏策划灵感。','https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=85'],
 ['games','Steam · 游戏发现','https://store.steampowered.com/','从官方商店发现游戏与社区内容。','https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=900&q=85'],
 ['games','Nintendo · 游戏与角色','https://www.nintendo.com/','角色 IP、游戏体验与内容设计。','https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=900&q=85'],
 ['games','PlayStation · 叙事游戏','https://www.playstation.com/','官方游戏发布与角色故事。','https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=900&q=85'],
 ['beauty','CHANEL · 香氛与美学','https://www.chanel.com/','品牌视觉与香氛产品灵感。','https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85'],
 ['beauty','Dior · Beauty Stories','https://www.dior.com/','官方美妆、时装与影像内容。','https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85'],
 ['beauty','Aesop · 感官与空间','https://www.aesop.com/','产品叙事、空间设计与生活方式。','https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85'],
 ['beauty','Sephora · 美妆发现','https://www.sephora.com/','美妆分类、产品发现与内容体验。','https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85']
];
const settings={websiteName:'FanVerse',siteTitle:'FanVerse · 收藏你的热爱',description:'追星、电影、游戏与美妆灵感收藏产品 Demo',keywords:'追星,电影IP,游戏,美妆,收藏',siteUrl:'http://localhost:3102',githubUrl:'https://github.com/scigjh1/fanverse-pintree',copyrightText:'FanVerse · Based on Pintree · MIT',enableTopBanner:'true',topBannerTitle:'FanVerse',topBannerDescription:'让每一份热爱，都有自己的收藏宇宙。',topBannerButtonText:'探索电影宇宙',topBannerButtonLink:'/?collection=film',logoUrl:'/fanverse-logo.svg',enableFooter:'true',defaultViewStyle:'card',enableSearch:'true',enableSidebarAds:'false',enableFooterAds:'false',enableTopAds:'false'};
try {
 for(const [key,value] of Object.entries(settings)) await db.siteSetting.upsert({where:{key},update:{value},create:{key,value,type:'string',group: key.startsWith('topBanner')||key.startsWith('enable')?'feature':'basic'}});
 for(let order=0;order<categories.length;order++){const [id,slug,name,description]=categories[order];await db.collection.upsert({where:{id},update:{name,slug,description,viewStyle:'card'},create:{id,slug,name,description,viewStyle:'card',sortStyle:'manual',sortOrder:order,isPublic:true}});}
 for(let i=0;i<links.length;i++){const [category,title,url,description,icon]=links[i];const id='fanverse-bookmark-'+i;const collectionId='fanverse-'+category;await db.bookmark.upsert({where:{id},update:{title,url,description,icon,collectionId},create:{id,title,url,description,icon,collectionId,isFeatured:i%4===0,sortOrder:i,createdAt:now}});}
 console.log('Demo seed ready: 4 collections, 16 public official links.');
}finally{await db.$disconnect();}
