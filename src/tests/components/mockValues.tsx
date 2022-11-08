export const actorSelectedMock = {
  id: "6369d2cdf9965ee9edc6c503",
  firstName: "admin",
  lastName: "test",
  gender: "male",
  age: 123,
  imgUrl:
    "https://wallpapers.com/images/hd/inspirational-short-quotes-desktop-7o2nmgbytnvvz6sv.jpg",
};

export const moviesOfActorMock = [
  {
    id: "6369d2cdf9965ee9edc6c504",
    actorDetailsId: "6369d2cdf9965ee9edc6c503",
    movieId: "6369d10ef9965ee9edc6c501",
  },
  {
    id: "6369d2cdf9965ee9edc6c501",
    actorDetailsId: "6369d2cdf9965ee9edc6c503",
    movieId: "6369d10ef9965ee9edc6c503",
  },
];

export const actorsMock = [
  {
    id: "6369d2cdf9965ee9edc6c503",
    firstName: "actor",
    lastName: "test",
    gender: "male",
    age: 123,
    imgUrl:
      "https://wallpapers.com/images/hd/inspirational-short-quotes-desktop-7o2nmgbytnvvz6sv.jpg",
  },
  {
    id: "6369d2cdf9965ee9edc6c503",
    firstName: "actor1",
    lastName: "test1",
    gender: "female",
    age: 123,
    imgUrl:
      "https://wallpapers.com/images/hd/inspirational-short-quotes-desktop-7o2nmgbytnvvz6sv.jpg",
  },
];

//fixed do not add/delete/edit
export const moviesMock = [
  {
    id: "6369d10ef9965ee9edc6c501",
    title: "movie1",
    description: "desc1",
    imgUrl:
      "https://occ.a.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABZs5BpWP48pgeeZZKvJygz2bPRyEMHHPVrcaxkhGXC1bzfW7iao9Fqwv4AZGMsXCT4ZX7SIKpmvumaVC2h_Yyo2OjJ8wHL0xQIjZ.jpg?r=326",
    cost: 1235,
    yearRelease: "2022-11-02T00:00:00.000Z",
  },
  {
    id: "6369d10ef9965ee9edc6c5021",
    title: "movie2",
    description: "desc2",
    imgUrl:
      "https://occ.a.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABZs5BpWP48pgeeZZKvJygz2bPRyEMHHPVrcaxkhGXC1bzfW7iao9Fqwv4AZGMsXCT4ZX7SIKpmvumaVC2h_Yyo2OjJ8wHL0xQIjZ.jpg?r=326",
    cost: 145,
    yearRelease: "2022-11-02T00:00:00.000Z",
  },
  {
    id: "6369d10ef9965ee9edc6c503",
    title: "movie3",
    description: "desc3",
    imgUrl:
      "https://occ.a.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABZs5BpWP48pgeeZZKvJygz2bPRyEMHHPVrcaxkhGXC1bzfW7iao9Fqwv4AZGMsXCT4ZX7SIKpmvumaVC2h_Yyo2OjJ8wHL0xQIjZ.jpg?r=326",
    cost: 2345,
    yearRelease: "2021-11-02T00:00:00.000Z",
  },
];

export const userMock = [
  {
    id: "6369d063f9965ee9edc6c4ff",
    email: "user1@example.com",
    firstName: "user2",
    lastName: "role",
    approved: true,
    permissions: ["user"],
  },
  {
    id: "6369d063f9965ee9edc6c4f1",
    email: "admin2@example.com",
    firstName: "admin1",
    lastName: "sample",
    approved: false,
    permissions: ["admin"],
  },
];
