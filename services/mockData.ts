// Mock data for ACG - Argentine sports achievements

export interface Achievement {
  id: string;
  athleteName: string;
  sport: string;
  achievement: string;
  medalType?: 'gold' | 'silver' | 'bronze' | null;
  date: string;
  year: number;
  description: string;
  imageUrl: string;
  location: string;
  eventName: string;
}

export interface UpcomingEvent {
  id: string;
  sport: string;
  athleteOrTeam: string;
  eventName: string;
  location: string;
  country: string;
  date: string;
  time: string;
  streamingUrl?: string;
  isTeamEvent: boolean;
}

const SPORTS = [
  'Fútbol',
  'Tenis',
  'Tenis de Mesa',
  'Hockey',
  'Bádminton',
  'Esgrima',
  'Pádel',
  'Rugby',
  'Básquet',
  'Vóley',
  'Atletismo',
  'Natación',
  'Boxeo',
  'Judo',
  'Gimnasia',
  'Remo',
  'Vela',
  'Ciclismo',
  'Golf',
  'Polo',
];

const PEXEL_IMAGES: Record<string, string> = {
  Fútbol: 'https://images.pexels.com/photos/1884576/pexels-photo-1884576.jpeg?auto=compress&cs=tinysrgb&w=400',
  Tenis: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=400',
  'Tenis de Mesa': 'https://images.pexels.com/photos/5765/athlete-blur-competition-desk.jpg?auto=compress&cs=tinysrgb&w=400',
  Hockey: 'https://images.pexels.com/photos/3621234/pexels-photo-3621234.jpeg?auto=compress&cs=tinysrgb&w=400',
  Bádminton: 'https://images.pexels.com/photos/3660204/pexels-photo-3660204.jpeg?auto=compress&cs=tinysrgb&w=400',
  Esgrima: 'https://images.pexels.com/photos/6724/pexels-photo-6724.jpeg?auto=compress&cs=tinysrgb&w=400',
  Pádel: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=400',
  Rugby: 'https://images.pexels.com/photos/3621234/pexels-photo-3621234.jpeg?auto=compress&cs=tinysrgb&w=400',
  Básquet: 'https://images.pexels.com/photos/2291004/pexels-photo-2291004.jpeg?auto=compress&cs=tinysrgb&w=400',
  Vóley: 'https://images.pexels.com/photos/6203543/pexels-photo-6203543.jpeg?auto=compress&cs=tinysrgb&w=400',
  Atletismo: 'https://images.pexels.com/photos/209956/pexels-photo-209956.jpeg?auto=compress&cs=tinysrgb&w=400',
  Natación: 'https://images.pexels.com/photos/1263348/pexels-photo-1263348.jpeg?auto=compress&cs=tinysrgb&w=400',
  Boxeo: 'https://images.pexels.com/photos/163403/box-sport-men-training-163403.jpeg?auto=compress&cs=tinysrgb&w=400',
  Judo: 'https://images.pexels.com/photos/6724/pexels-photo-6724.jpeg?auto=compress&cs=tinysrgb&w=400',
  Gimnasia: 'https://images.pexels.com/photos/1386660/pexels-photo-1386660.jpeg?auto=compress&cs=tinysrgb&w=400',
  Remo: 'https://images.pexels.com/photos/1263348/pexels-photo-1263348.jpeg?auto=compress&cs=tinysrgb&w=400',
  Vela: 'https://images.pexels.com/photos/1263348/pexels-photo-1263348.jpeg?auto=compress&cs=tinysrgb&w=400',
  Ciclismo: 'https://images.pexels.com/photos/209956/pexels-photo-209956.jpeg?auto=compress&cs=tinysrgb&w=400',
  Golf: 'https://images.pexels.com/photos/6647464/pexels-photo-6647464.jpeg?auto=compress&cs=tinysrgb&w=400',
  Polo: 'https://images.pexels.com/photos/1884576/pexels-photo-1884576.jpeg?auto=compress&cs=tinysrgb&w=400',
};

function getImageForSport(sport: string): string {
  return PEXEL_IMAGES[sport] || PEXEL_IMAGES['Fútbol'];
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: '1',
    athleteName: 'Selección Argentina',
    sport: 'Fútbol',
    achievement: 'Campeón del Mundo',
    medalType: 'gold',
    date: '2022-12-18',
    year: 2022,
    description: 'Tercera Copa del Mundo. Argentina derrota a Francia en una final épica por penales en Lusail, Qatar.',
    imageUrl: getImageForSport('Fútbol'),
    location: 'Lusail, Qatar',
    eventName: 'Copa Mundial FIFA 2022',
  },
  {
    id: '2',
    athleteName: 'Lionel Messi',
    sport: 'Fútbol',
    achievement: 'Balón de Oro x8',
    medalType: 'gold',
    date: '2023-10-30',
    year: 2023,
    description: 'Octavo Balón de Oro de su carrera, consolidándose como el máximo ganador del prestigioso premio.',
    imageUrl: getImageForSport('Fútbol'),
    location: 'París, Francia',
    eventName: 'Balón de Oro 2023',
  },
  {
    id: '3',
    athleteName: 'Leandro Paredes',
    sport: 'Tenis de Mesa',
    achievement: 'Medalla de Bronce',
    medalType: 'bronze',
    date: '2023-11-15',
    year: 2023,
    description: 'Primer podio argentino en el Campeonato Sudamericano de Tenis de Mesa en la categoría individual masculina.',
    imageUrl: getImageForSport('Tenis de Mesa'),
    location: 'Lima, Perú',
    eventName: 'Campeonato Sudamericano Tenis de Mesa',
  },
  {
    id: '4',
    athleteName: 'Luciana Aymar',
    sport: 'Hockey',
    achievement: 'Medalla de Oro',
    medalType: 'gold',
    date: '2010-10-23',
    year: 2010,
    description: 'Las Leonas conquistan el oro en los Juegos Panamericanos de Guadalajara.',
    imageUrl: getImageForSport('Hockey'),
    location: 'Guadalajara, México',
    eventName: 'Juegos Panamericanos 2010',
  },
  {
    id: '5',
    athleteName: 'Martín Sánchez',
    sport: 'Bádminton',
    achievement: 'Semifinalista',
    medalType: null,
    date: '2022-08-20',
    year: 2022,
    description: 'Histórico pase a semifinales en el Panamericano de Bádminton, el mejor resultado argentino en la disciplina.',
    imageUrl: getImageForSport('Bádminton'),
    location: 'Santo Domingo, República Dominicana',
    eventName: 'Campeonato Panamericano Bádminton',
  },
  {
    id: '6',
    athleteName: 'José María Larocca',
    sport: 'Esgrima',
    achievement: 'Medalla de Plata',
    medalType: 'silver',
    date: '2019-04-14',
    year: 2019,
    description: 'Subcampeón panamericano en sable individual, logrando el primer podio argentino en la modalidad en décadas.',
    imageUrl: getImageForSport('Esgrima'),
    location: 'Toronto, Canadá',
    eventName: 'Campeonato Panamericano Esgrima',
  },
  {
    id: '7',
    athleteName: 'Agustín Tapia',
    sport: 'Pádel',
    achievement: 'N°1 del Mundo',
    medalType: 'gold',
    date: '2023-06-12',
    year: 2023,
    description: 'El "Mozart de Catamarca" alcanza el primer puesto del ranking mundial de pádel junto a Arturo Coello.',
    imageUrl: getImageForSport('Pádel'),
    location: 'Madrid, España',
    eventName: 'World Padel Tour',
  },
  {
    id: '8',
    athleteName: 'Los Pumas',
    sport: 'Rugby',
    achievement: 'Tercer Puesto',
    medalType: 'bronze',
    date: '2007-10-19',
    year: 2007,
    description: 'Histórico tercer puesto en la Copa del Mundo de Rugby 2007, derrotando a Francia en París.',
    imageUrl: getImageForSport('Rugby'),
    location: 'París, Francia',
    eventName: 'Copa Mundial Rugby 2007',
  },
  {
    id: '9',
    athleteName: 'Selección Argentina Básquet',
    sport: 'Básquet',
    achievement: 'Campeón Olímpico',
    medalType: 'gold',
    date: '2004-08-28',
    year: 2004,
    description: 'Oro olímpico en Atenas 2004. Argentina vence a Italia en la final y se consagra campeón olímpico.',
    imageUrl: getImageForSport('Básquet'),
    location: 'Atenas, Grecia',
    eventName: 'Juegos Olímpicos Atenas 2004',
  },
  {
    id: '10',
    athleteName: 'Selección Argentina Vóley',
    sport: 'Vóley',
    achievement: 'Subcampeón del Mundo',
    medalType: 'silver',
    date: '2022-09-11',
    year: 2022,
    description: 'Histórico subcampeonato mundial en Polonia. Los varones logran el mejor resultado de la historia.',
    imageUrl: getImageForSport('Vóley'),
    location: 'Katowice, Polonia',
    eventName: 'Campeonato Mundial Vóley 2022',
  },
  {
    id: '11',
    athleteName: 'Santiago Catrofe',
    sport: 'Atletismo',
    achievement: 'Récord Nacional',
    medalType: null,
    date: '2023-05-20',
    year: 2023,
    description: 'Nuevo récord nacional en los 3.000 metros con obstáculos en el Meeting de Madrid.',
    imageUrl: getImageForSport('Atletismo'),
    location: 'Madrid, España',
    eventName: 'Meeting de Madrid',
  },
  {
    id: '12',
    athleteName: 'Delfina Pignatiello',
    sport: 'Natación',
    achievement: 'Medalla de Oro',
    medalType: 'gold',
    date: '2019-08-11',
    year: 2019,
    description: 'Triple campeona panamericana en Lima 2019. Oro en 800m, 1500m y 400m libre.',
    imageUrl: getImageForSport('Natación'),
    location: 'Lima, Perú',
    eventName: 'Juegos Panamericanos 2019',
  },
  {
    id: '13',
    athleteName: 'Marcos Maidana',
    sport: 'Boxeo',
    achievement: 'Campeón Mundial',
    medalType: 'gold',
    date: '2011-12-03',
    year: 2011,
    description: 'Campeón mundial de peso welter junior WBA. Victoria ante Amir Khan en Las Vegas.',
    imageUrl: getImageForSport('Boxeo'),
    location: 'Las Vegas, USA',
    eventName: 'WBA World Championship',
  },
  {
    id: '14',
    athleteName: 'Paula Pareto',
    sport: 'Judo',
    achievement: 'Medalla de Oro Olímpico',
    medalType: 'gold',
    date: '2016-08-06',
    year: 2016,
    description: 'Primera mujer argentina en ganar oro olímpico. Campeona en Río 2016 en la categoría -48kg.',
    imageUrl: getImageForSport('Judo'),
    location: 'Río de Janeiro, Brasil',
    eventName: 'Juegos Olímpicos Río 2016',
  },
  {
    id: '15',
    athleteName: 'Paula Pareto',
    sport: 'Judo',
    achievement: 'Medalla de Bronce Olímpico',
    medalType: 'bronze',
    date: '2008-08-09',
    year: 2008,
    description: 'Medalla de bronce en Beijing 2008. Primera judoca argentina en subir al podio olímpico.',
    imageUrl: getImageForSport('Judo'),
    location: 'Beijing, China',
    eventName: 'Juegos Olímpicos Beijing 2008',
  },
  {
    id: '16',
    athleteName: 'Gabriela Sabatini',
    sport: 'Tenis',
    achievement: 'Campeona del US Open',
    medalType: 'gold',
    date: '1990-09-08',
    year: 1990,
    description: 'Gana el US Open derrotando a Steffi Graf en la final. Único Grand Slam de su carrera.',
    imageUrl: getImageForSport('Tenis'),
    location: 'Nueva York, USA',
    eventName: 'US Open 1990',
  },
  {
    id: '17',
    athleteName: 'Guillermo Vilas',
    sport: 'Tenis',
    achievement: 'N°1 del Mundo',
    medalType: 'gold',
    date: '1977-04-25',
    year: 1977,
    description: 'Alcanza el puesto número 1 del ranking ATP en 1977. Leyenda del tenis argentino.',
    imageUrl: getImageForSport('Tenis'),
    location: 'Buenos Aires, Argentina',
    eventName: 'Ranking ATP',
  },
  {
    id: '18',
    athleteName: 'Sebastián Crismanich',
    sport: 'Taekwondo',
    achievement: 'Medalla de Oro Olímpico',
    medalType: 'gold',
    date: '2012-08-08',
    year: 2012,
    description: 'Campeón olímpico en Londres 2012. Primera medalla de oro olímpica para Argentina en Taekwondo.',
    imageUrl: getImageForSport('Judo'),
    location: 'Londres, Reino Unido',
    eventName: 'Juegos Olímpicos Londres 2012',
  },
  {
    id: '19',
    athleteName: 'Selección Argentina Polo',
    sport: 'Polo',
    achievement: 'Campeón del Mundo',
    medalType: 'gold',
    date: '2011-11-27',
    year: 2011,
    description: 'Argentina gana su quinta Copa del Mundo de Polo en Buenos Aires.',
    imageUrl: getImageForSport('Polo'),
    location: 'Buenos Aires, Argentina',
    eventName: 'Copa del Mundo Polo',
  },
  {
    id: '20',
    athleteName: 'Emiliano Grillo',
    sport: 'Golf',
    achievement: 'Campeón del PGA Tour',
    medalType: 'gold',
    date: '2023-10-15',
    year: 2023,
    description: 'Victoria en el Shriners Children\'s Open, segundo título del PGA Tour en su carrera.',
    imageUrl: getImageForSport('Golf'),
    location: 'Las Vegas, USA',
    eventName: 'Shriners Children\'s Open',
  },
  {
    id: '21',
    athleteName: 'Alejandro Kirbiz',
    sport: 'Ciclismo',
    achievement: 'Campeón Panamericano',
    medalType: 'gold',
    date: '2023-05-05',
    year: 2023,
    description: 'Campeón panamericano de ruta en Panamá. Primer título continental de su carrera.',
    imageUrl: getImageForSport('Ciclismo'),
    location: 'Panamá',
    eventName: 'Campeonato Panamericano Ciclismo',
  },
  {
    id: '22',
    athleteName: 'Brian Rosso',
    sport: 'Remo',
    achievement: 'Medalla de Plata',
    medalType: 'silver',
    date: '2019-08-11',
    year: 2019,
    description: 'Plata en remo single scull en los Juegos Panamericanos de Lima 2019.',
    imageUrl: getImageForSport('Remo'),
    location: 'Lima, Perú',
    eventName: 'Juegos Panamericanos 2019',
  },
  {
    id: '23',
    athleteName: 'Cecilia Carranza',
    sport: 'Vela',
    achievement: 'Medalla de Oro Olímpico',
    medalType: 'gold',
    date: '2016-08-16',
    year: 2016,
    description: 'Oro olímpico en vela clase Laser Radial en Río 2016. Primera medalla dorada argentina en vela.',
    imageUrl: getImageForSport('Vela'),
    location: 'Río de Janeiro, Brasil',
    eventName: 'Juegos Olímpicos Río 2016',
  },
  {
    id: '24',
    athleteName: 'Martina Dominici',
    sport: 'Gimnasia',
    achievement: 'Campeona Sudamericana',
    medalType: 'gold',
    date: '2023-07-22',
    year: 2023,
    description: 'Campeona sudamericana en salto. Nuevo título continental para la gimnasia argentina.',
    imageUrl: getImageForSport('Gimnasia'),
    location: 'Cali, Colombia',
    eventName: 'Campeonato Sudamericano Gimnasia',
  },
];

const UPCOMING_EVENTS: UpcomingEvent[] = [
  {
    id: 'u1',
    sport: 'Fútbol',
    athleteOrTeam: 'Selección Argentina',
    eventName: 'Eliminatorias Sudamericanas',
    location: 'Monumental',
    country: 'Argentina',
    date: '2025-03-25',
    time: '21:00',
    streamingUrl: 'https://tycsports.com',
    isTeamEvent: true,
  },
  {
    id: 'u2',
    sport: 'Tenis',
    athleteOrTeam: 'Francisco Cerúndolo',
    eventName: 'ATP 250 Córdoba',
    location: 'Orfeo Superdomo',
    country: 'Argentina',
    date: '2025-02-10',
    time: '15:00',
    streamingUrl: 'https://tennischannel.com',
    isTeamEvent: false,
  },
  {
    id: 'u3',
    sport: 'Rugby',
    athleteOrTeam: 'Los Pumas',
    eventName: 'The Rugby Championship',
    location: 'Estadio Vélez',
    country: 'Argentina',
    date: '2025-08-16',
    time: '16:00',
    streamingUrl: 'https://espn.com',
    isTeamEvent: true,
  },
  {
    id: 'u4',
    sport: 'Pádel',
    athleteOrTeam: 'Tapia / Coello',
    eventName: 'Premier Padel Buenos Aires',
    location: 'Aldo Cantoni',
    country: 'Argentina',
    date: '2025-03-15',
    time: '19:00',
    streamingUrl: 'https://premierpadel.com',
    isTeamEvent: true,
  },
  {
    id: 'u5',
    sport: 'Hockey',
    athleteOrTeam: 'Las Leonas',
    eventName: 'Pro League',
    location: 'Estadio Parque Roca',
    country: 'Argentina',
    date: '2025-04-05',
    time: '18:30',
    streamingUrl: 'https://espn.com',
    isTeamEvent: true,
  },
  {
    id: 'u6',
    sport: 'Básquet',
    athleteOrTeam: 'Selección Argentina',
    eventName: 'FIBA AmeriCup Qualifiers',
    location: 'Polideportivo',
    country: 'Argentina',
    date: '2025-02-21',
    time: '20:00',
    streamingUrl: 'https://fibalive.com',
    isTeamEvent: true,
  },
];

export function getLatestAchievements(): Promise<Achievement[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...ACHIEVEMENTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }, 1200);
  });
}

export function getUpcomingEvents(): Promise<UpcomingEvent[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const today = new Date();
      const future = UPCOMING_EVENTS.filter((e) => new Date(e.date) >= today);
      resolve(future.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    }, 800);
  });
}

export function getHistoricalArchive(): Promise<Achievement[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...ACHIEVEMENTS].sort((a, b) => b.year - a.year));
    }, 600);
  });
}

export function getAllSports(): string[] {
  return [...SPORTS].sort();
}

export function getAllYears(): number[] {
  const years = ACHIEVEMENTS.map((a) => a.year);
  return [...new Set(years)].sort((a, b) => b - a);
}
