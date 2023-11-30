import React, { useState, useEffect } from "react"
import FlexSearch from "flexsearch";
import { graphql } from "gatsby";

const talkingPoints = [
  {
    "title": "Start Here - Talking Points Overview",
    "description": "Energy policy, including climate policy, will remain one of the main policy issues for the foreseeable future. I believe that the best policy for America\u2019s future and the world\u2019s future is a policy of energy freedom, in which all sources of energy\u2014including fossil fuels\u2014can compete to produce the most reliable, lowest-cost energy for billions of people\u2026",
    "id": 1,
    "date": "2023-08-16T00:00:00.000000Z",
    "views": 167319,
    "slug": "start-here-talking-points-overview",
    "image": "image-3.jpg"
  },
  {
    "title": "My Message to Leaders at Africa Energy Week 2023",
    "description": "For the sake of Africans and the rest of the world, African leaders need to confidently reject the net-zero movement and embrace energy freedom\u2014including fossil fuel freedom.",
    "id": 2,
    "date": "2019-05-13T00:00:00.000000Z",
    "views": 216207,
    "slug": "my-message-to-leaders-at-africa-energy-week-2023",
    "image": "image-27.jpg"
  },
  {
    "title": "How today's global anti-fossil-fuel agenda is crippling American small businesses",
    "description": "My testimony to the House Committee on Small Business, Subcommittee on Rural Development, Energy, and Supply Chains on September 28, 2023.",
    "id": 3,
    "date": "2023-11-06T00:00:00.000000Z",
    "views": 312806,
    "slug": "how-todays-global-antifossilfuel-agenda-is-crippling-american-small-businesses",
    "image": "image-19.jpg"
  },
  {
    "title": "Every \"net zero by 2050\" myth, refuted",
    "description": "In preparation for a \"net zero by 2050\" debate that my opponent failed to show up for, I created refutations of every myth in support of net-zero that I've every encountered.",
    "id": 4,
    "date": "2023-08-15T00:00:00.000000Z",
    "views": 644012,
    "slug": "every-net-zero-by-2050-myth-refuted",
    "image": "image-42.jpg"
  },
  {
    "title": "Maui's wildfire tragedy caused by \u201cgreen\u201d policies, not warming",
    "description": "The unnecessarily large wildfires in Maui were not caused by the slow warming of climate but by \u201cgreen\u201d policies that prevented proper wildfire management.",
    "id": 5,
    "date": "2021-09-08T00:00:00.000000Z",
    "views": 224213,
    "slug": "mauis-wildfire-tragedy-caused-by-green-policies-not-warming",
    "image": "image-4.jpg"
  },
  {
    "title": "25 myths in the media's Idalia coverage",
    "description": "The media are using Hurricane Idalia to spread the false narrative that fossil fuels make extreme weather danger worse.",
    "id": 6,
    "date": "2022-03-19T00:00:00.000000Z",
    "views": 295264,
    "slug": "25-myths-in-the-medias-idalia-coverage",
    "image": "image-31.jpg"
  },
  {
    "title": "Do Not Declare a \u201cClimate Emergency\u201d",
    "description": "\u201cClimate emergency\u201d declaration = endless dictatorship",
    "id": 7,
    "date": "2022-10-20T00:00:00.000000Z",
    "views": 669241,
    "slug": "do-not-declare-a-climate-emergency",
    "image": "image-38.jpg"
  },
  {
    "title": "The myth of an overheated planet",
    "description": "Myth: This year's hot temperatures show that fossil fuels are already making Earth unlivably hot.",
    "id": 8,
    "date": "2020-12-18T00:00:00.000000Z",
    "views": 49334,
    "slug": "the-myth-of-an-overheated-planet",
    "image": "image-32.jpg"
  },
  {
    "title": "Myth: Solar and wind are cheaper than fossil fuels",
    "description": "Truth: Solar and wind are only cheaper than fossil fuels in at most a small fraction of situations. For the overwhelming majority of the world\u2019s energy needs, solar and wind are either completely unable to replace fossil fuels or far more expensive.",
    "id": 9,
    "date": "2021-12-28T00:00:00.000000Z",
    "views": 274520,
    "slug": "myth-solar-and-wind-are-cheaper-than-fossil-fuels",
    "image": "image-23.jpg"
  },
  {
    "title": "Myth: Solar and wind are helping save our grid from extreme heat",
    "description": "Truth: Preferences for solar and wind have made our grid embarrassingly vulnerable to heat waves\u2014and cold snaps\u2014that a fossil-fueled grid could easily manage.",
    "id": 10,
    "date": "2019-06-18T00:00:00.000000Z",
    "views": 759179,
    "slug": "myth-solar-and-wind-are-helping-save-our-grid-from-extreme-heat",
    "image": "image-33.jpg"
  },
  {
    "title": "How to answer loaded climate questions",
    "description": "Answers to: \u201cDo you believe in climate change?\u201d \u201cAre you a climate denier?\u201d \u201cWill you listen to the scientists on climate change?\u201d And more!",
    "id": 11,
    "date": "2020-06-01T00:00:00.000000Z",
    "views": 121630,
    "slug": "how-to-answer-loaded-climate-questions",
    "image": "image-24.jpg"
  },
  {
    "title": "\"Green Energy\" is neither energy nor green",
    "description": "\u201cGreen energy\u201d has 2 problems: 1) It\u2019s not really energy: It doesn\u2019t provide reliable energy. 2) It\u2019s not really green: It has a huge \u201cenvironmental impact.\u201d",
    "id": 12,
    "date": "2020-02-20T00:00:00.000000Z",
    "views": 625215,
    "slug": "green-energy-is-neither-energy-nor-green",
    "image": "image-26.jpg"
  },
  {
    "title": "The Myth of Fossil Fuel Subsidies",
    "description": "Fossil fuels would be used considerably more were it not for the disproportionately large government punishments that they receive.",
    "id": 13,
    "date": "2019-12-27T00:00:00.000000Z",
    "views": 911116,
    "slug": "the-myth-of-fossil-fuel-subsidies",
    "image": "image-39.jpg"
  },
  {
    "title": "The IPCC's perversion of science",
    "description": "The IPCC's Synthesis Report severely distorts science to advance a corrupt political agenda.",
    "id": 14,
    "date": "2022-02-11T00:00:00.000000Z",
    "views": 24577,
    "slug": "the-ipccs-perversion-of-science",
    "image": "image-4.jpg"
  },
  {
    "title": "Biden's 67% EV policy: a dictatorial attack on the American driver and the US grid",
    "description": "Biden's proposed rules would 1. Force Americans to drive inferior cars, 2. Place massive new demand for reliable electricity on a grid that is declining in reliability",
    "id": 15,
    "date": "2020-04-07T00:00:00.000000Z",
    "views": 399440,
    "slug": "bidens-67-ev-policy-a-dictatorial-attack-on-the-american-driver-and-the-us-grid",
    "image": "image-39.jpg"
  },
  {
    "title": "The limitless hidden costs of the IRA",
    "description": "We were told that the Inflation Reduction Act (IRA) would give us cheap \u201cgreen\u201d energy for \u201conly\u201d $400B in subsidies. In reality, the IRA has a limitless price tag.",
    "id": 16,
    "date": "2019-02-04T00:00:00.000000Z",
    "views": 236535,
    "slug": "the-limitless-hidden-costs-of-the-ira",
    "image": "image-35.jpg"
  },
  {
    "title": "Holding the right people responsible for the global energy crisis",
    "description": "As people look for solutions to this crisis, it is crucial that the right people get implicated: anti-fossil-fuel leaders",
    "id": 17,
    "date": "2020-04-08T00:00:00.000000Z",
    "views": 838462,
    "slug": "holding-the-right-people-responsible-for-the-global-energy-crisis",
    "image": "image-40.jpg"
  },
  {
    "title": "The proper, responsible use of the Strategic Petroleum Reserve (SPR) vs. the Biden administration\u2019s reckless abuse of the SPR",
    "description": "My testimony to the House Oversight Committee on March 8, 2023",
    "id": 18,
    "date": "2021-08-19T00:00:00.000000Z",
    "views": 814162,
    "slug": "the-proper-responsible-use-of-the-strategic-petroleum-reserve-spr-vs-the-biden-administrations-reckless-abuse-of-the-spr",
    "image": "image-37.jpg"
  },
  {
    "title": "The myth that \"97% of climate scientists agree\" about a climate crisis",
    "description": "Most climate scientists agree that we have some climate impact. This does not at all justify the rapid elimination of fossil fuels.",
    "id": 19,
    "date": "2019-03-10T00:00:00.000000Z",
    "views": 500217,
    "slug": "the-myth-that-97-of-climate-scientists-agree-about-a-climate-crisis",
    "image": "image-27.jpg"
  },
  {
    "title": "Talking points on Biden's State of the Union 2023",
    "description": "President Biden is evading responsibility for the consequences of the anti-freedom, anti-development, anti-fossil-fuel policies he has supported.",
    "id": 20,
    "date": "2023-07-14T00:00:00.000000Z",
    "views": 506216,
    "slug": "talking-points-on-bidens-state-of-the-union-2023",
    "image": "image-31.jpg"
  },
  {
    "title": "Refuting the myth that just a small area of solar panels plus storage can power the world",
    "description": "Storing just 3 days of global energy would cost $590 trillion at Elon Musk\u2019s current prices. And the panels would take up more space than all the world\u2019s cities, towns, and villages combined.",
    "id": 21,
    "date": "2022-07-30T00:00:00.000000Z",
    "views": 662605,
    "slug": "refuting-the-myth-that-just-a-small-area-of-solar-panels-plus-storage-can-power-the-world",
    "image": "image-28.jpg"
  },
  {
    "title": "Calls to ban gas stoves are anti-science, anti-freedom, and anti-energy",
    "description": "Instead of informing us with accurate science about gas stoves so we can make better decisions, anti-fossil fuel activists are distorting science",
    "id": 22,
    "date": "2021-12-30T00:00:00.000000Z",
    "views": 227331,
    "slug": "calls-to-ban-gas-stoves-are-antiscience-antifreedom-and-antienergy",
    "image": "image-4.jpg"
  },
  {
    "title": "4 energy hearings the House should hold",
    "description": "Republicans are promising a pro-energy agenda. Here are 4 essential topics they should take up.",
    "id": 23,
    "date": "2022-11-05T00:00:00.000000Z",
    "views": 931787,
    "slug": "4-energy-hearings-the-house-should-hold",
    "image": "image-33.jpg"
  },
  {
    "title": "My Energy Story",
    "description": "How I became the world\u2019s leading champion of fossil fuels",
    "id": 24,
    "date": "2023-10-02T00:00:00.000000Z",
    "views": 620615,
    "slug": "my-energy-story",
    "image": "image-0.jpg"
  },
  {
    "title": "The fusion distraction",
    "description": "The \u201cgreen energy\u201d movement is celebrating a technical breakthrough in nuclear fusion, in order to distract from the catastrophic consequences of its anti-fission, anti-fossil-fuel policies.",
    "id": 25,
    "date": "2021-10-17T00:00:00.000000Z",
    "views": 573415,
    "slug": "the-fusion-distraction",
    "image": "image-37.jpg"
  },
  {
    "title": "End preferences for unreliable electricity",
    "description": "Today's grids are being ruined by systemic preferences for unreliable electricity. Congress should end these now.",
    "id": 26,
    "date": "2022-11-22T00:00:00.000000Z",
    "views": 274877,
    "slug": "end-preferences-for-unreliable-electricity",
    "image": "image-23.jpg"
  },
  {
    "title": "Reject Net Zero, Embrace Energy Freedom",
    "description": "\"Net zero by 2050\" policies would be apocalyptically destructive if fully implemented. They should be totally rejected in favor of energy freedom policies.",
    "id": 27,
    "date": "2020-09-08T00:00:00.000000Z",
    "views": 741914,
    "slug": "reject-net-zero-embrace-energy-freedom",
    "image": "image-30.jpg"
  },
  {
    "title": "\"Climate reparations\" are immoral",
    "description": "The hottest idea emerging from the UN's COP27 climate conference is \"climate reparations.\" This is an immoral idea that Congress should reject.",
    "id": 28,
    "date": "2023-04-16T00:00:00.000000Z",
    "views": 890145,
    "slug": "climate-reparations-are-immoral",
    "image": "image-5.jpg"
  },
  {
    "title": "Talking points for the holiday season",
    "description": "Here are talking points answering 12 of today\u2019s most important energy questions for any energy-related discussions this holiday season.",
    "id": 29,
    "date": "2019-02-17T00:00:00.000000Z",
    "views": 830707,
    "slug": "talking-points-for-the-holiday-season",
    "image": "image-11.jpg"
  },
  {
    "title": "The EPA vs. the grid",
    "description": "We\u2019re in an electricity crisis, with reliable power plants shutting down far faster than they are being built. The EPA plans to make things much worse.",
    "id": 30,
    "date": "2022-11-12T00:00:00.000000Z",
    "views": 676644,
    "slug": "the-epa-vs-the-grid",
    "image": "image-22.jpg"
  },
  {
    "title": "Our dangerous diesel shortage caused by anti-fossil-fuel politicians",
    "description": "The US is experiencing a dangerous shortage of diesel fuel. Blame our clueless anti-fossil-fuel politicians.",
    "id": 31,
    "date": "2020-03-02T00:00:00.000000Z",
    "views": 616285,
    "slug": "our-dangerous-diesel-shortage-caused-by-antifossilfuel-politicians",
    "image": "image-22.jpg"
  },
  {
    "title": "How Biden\u2019s abuse of the Strategic Petroleum Reserve to win votes harms our energy security",
    "description": "Instead of using the Strategic Petroleum Reserve (SPR) to protect America\u2019s oil security, the Biden administration is abusing the SPR to harm America\u2019s oil security.",
    "id": 32,
    "date": "2023-11-09T00:00:00.000000Z",
    "views": 574270,
    "slug": "how-bidens-abuse-of-the-strategic-petroleum-reserve-to-win-votes-harms-our-energy-security",
    "image": "image-30.jpg"
  },
  {
    "title": "America\u2019s energy crisis is mostly US Democrats\u2019 fault",
    "description": "Had Democrats spent the last 3.5 years liberating US oil/gas investment, production, and transport instead of strangling them, energy would be far cheaper.",
    "id": 33,
    "date": "2021-03-16T00:00:00.000000Z",
    "views": 558334,
    "slug": "americas-energy-crisis-is-mostly-us-democrats-fault",
    "image": "image-21.jpg"
  },
  {
    "title": "How a fake climate emergency created a real energy emergency",
    "description": "The false idea that fossil fuels' climate impacts are an \"emergency\" that requires us to rapidly eliminate fossil fuels has caused an energy emergency.",
    "id": 34,
    "date": "2023-08-12T00:00:00.000000Z",
    "views": 809496,
    "slug": "how-a-fake-climate-emergency-created-a-real-energy-emergency",
    "image": "image-10.jpg"
  },
  {
    "title": "25 myths about extreme weather, refuted",
    "description": "With Hurricane Ian, the media have once again put forward the narrative that fossil fuels make extreme weather danger worse\u2014and that fossil fuel supporters like Governor Ron Desantis are to blame.",
    "id": 35,
    "date": "2019-06-24T00:00:00.000000Z",
    "views": 504775,
    "slug": "25-myths-about-extreme-weather-refuted",
    "image": "image-33.jpg"
  },
  {
    "title": "Snappy answers to energy questions",
    "description": "This election season candidates are getting lots of energy-related questions. Here are pro-freedom, pro-human answers to some of the most popular ones.",
    "id": 36,
    "date": "2019-04-24T00:00:00.000000Z",
    "views": 478185,
    "slug": "snappy-answers-to-energy-questions",
    "image": "image-28.jpg"
  },
  {
    "title": "The \u201cInflation Reduction Act\u201d is a 4-step recipe for destroying American energy",
    "description": "Want to know whether a candidate is truly supportive of American energy? Here's one simple test: Did they oppose the \u201cInflation Reduction Act\u201d?",
    "id": 37,
    "date": "2020-03-03T00:00:00.000000Z",
    "views": 176286,
    "slug": "the-inflation-reduction-act-is-a-4step-recipe-for-destroying-american-energy",
    "image": "image-22.jpg"
  },
  {
    "title": "12 myths about the terrible \u201cInflation Reduction Act,\u201d refuted",
    "description": "The Inflation Reduction Act is one of the worst energy policies in American history. But its supporters are trying to hide this using 12 insidious myths.",
    "id": 38,
    "date": "2023-10-26T00:00:00.000000Z",
    "views": 985004,
    "slug": "12-myths-about-the-terrible-inflation-reduction-act-refuted",
    "image": "image-8.jpg"
  },
  {
    "title": "Electricity Emergency",
    "description": "America's grid is in decline and about to get far worse due to policies that 1) reward unreliable electricity, 2) prematurely shut down coal plants, 3) criminalize nuclear, and 4) force EV use.",
    "id": 39,
    "date": "2019-05-26T00:00:00.000000Z",
    "views": 810000,
    "slug": "electricity-emergency",
    "image": "image-17.jpg"
  },
  {
    "title": "The irrefutable case for a Fossil Future",
    "description": "If we want a world in which all 8 billion of us have the opportunity to flourish\u2014to live long, healthy, prosperous, fulfilling lives\u2014we need more, not less, fossil fuel. A summary of Fossil Future.",
    "id": 40,
    "date": "2023-06-11T00:00:00.000000Z",
    "views": 682790,
    "slug": "the-irrefutable-case-for-a-fossil-future",
    "image": "image-33.jpg"
  },
  {
    "title": "A pro-human, pro-freedom policy for CO2 emissions",
    "description": "The pro-human CO2 policy is to reduce CO2 emissions long-term through liberating innovation, not punishing America.",
    "id": 41,
    "date": "2020-07-26T00:00:00.000000Z",
    "views": 988125,
    "slug": "a-prohuman-profreedom-policy-for-co2-emissions",
    "image": "image-37.jpg"
  },
  {
    "title": "20 myths about fossil fuels, refuted",
    "description": "In Fossil Future I refute literally hundreds of myths about fossil fuels. Here are 20 myths that 11,000,000 people heard on Joe Rogan\u2019s podcast this year.",
    "id": 42,
    "date": "2022-08-18T00:00:00.000000Z",
    "views": 120769,
    "slug": "20-myths-about-fossil-fuels-refuted",
    "image": "image-4.jpg"
  },
  {
    "title": "The Energy Freedom Platform",
    "description": "The root of our global energy crisis is Green Energy Fascism. The solution is Energy Freedom.",
    "id": 43,
    "date": "2023-06-24T00:00:00.000000Z",
    "views": 515995,
    "slug": "the-energy-freedom-platform",
    "image": "image-4.jpg"
  },
  {
    "title": "Stop The Manchin Green New Deal",
    "description": "Contrary to Joe Manchin's \"Build Back Better is dead\" rhetoric about the energy/climate deal he just made, the deal contains many of the most destructive elements of the Green New Deal.",
    "id": 44,
    "date": "2023-07-29T00:00:00.000000Z",
    "views": 815982,
    "slug": "stop-the-manchin-green-new-deal",
    "image": "image-41.jpg"
  },
  {
    "title": "Testimony: \"How the Biden Administration and the Global Anti-Fossil-Fuel Movement Caused an Energy Crisis and Inflated Our Cost of Living\"",
    "description": "Testimony for the Congressional Off-Site Hearing: \u201cAddressing Bidenflation and Biden\u2019s Energy Crisis\u201d",
    "id": 45,
    "date": "2019-01-13T00:00:00.000000Z",
    "views": 675860,
    "slug": "testimony-how-the-biden-administration-and-the-global-antifossilfuel-movement-caused-an-energy-crisis-and-inflated-our-cost-of-living",
    "image": "image-0.jpg"
  },
  {
    "title": "A once-in-a-lifetime energy education opportunity",
    "description": "Now is the perfect time to educate the world about the need for pro-fossil-fuel, pro-freedom energy policies.",
    "id": 46,
    "date": "2020-10-21T00:00:00.000000Z",
    "views": 989685,
    "slug": "a-onceinalifetime-energy-education-opportunity",
    "image": "image-33.jpg"
  },
  {
    "title": "Earth Day truth: Fossil fuels make Earth BETTER",
    "description": "Fossil fuels are making Earth a better and better place by providing uniquely low-cost, reliable energy to billions of people--and are needed by billions more. We need a Fossil Future.",
    "id": 47,
    "date": "2023-09-03T00:00:00.000000Z",
    "views": 766670,
    "slug": "earth-day-truth-fossil-fuels-make-earth-better",
    "image": "image-20.jpg"
  },
  {
    "title": "Talking Points on US Democrats engaging in epic denial on oil and gasoline prices",
    "description": "Politicians around the world, including US Democrats, have opposed and threatened the oil and gas industry's existence. Now they are denying responsibility for the consequences: higher prices.",
    "id": 48,
    "date": "2020-02-29T00:00:00.000000Z",
    "views": 351407,
    "slug": "talking-points-on-us-democrats-engaging-in-epic-denial-on-oil-and-gasoline-prices",
    "image": "image-19.jpg"
  },
  {
    "title": "Talking Points on Europe\u2019s energy security crisis",
    "description": "Europe\u2019s energy insecurity, which has rendered it impotent to act against Putin, has been caused by its foolish abandonment of domestic fossil fuel production.",
    "id": 49,
    "date": "2021-05-21T00:00:00.000000Z",
    "views": 442693,
    "slug": "talking-points-on-europes-energy-security-crisis",
    "image": "image-34.jpg"
  },
  {
    "title": "The Truth About Geothermal Energy",
    "description": "Geothermal cannot replace a significant percentage of fossil fuel use because it requires the rare geology of places like Iceland. \"Deep geothermal\" has promise, but is decades away from scalability.",
    "id": 50,
    "date": "2021-10-13T00:00:00.000000Z",
    "views": 45170,
    "slug": "the-truth-about-geothermal-energy",
    "image": "image-10.jpg"
  },
  {
    "title": "Talking Points on how Europe's extreme vulnerability to Russia was totally preventable",
    "description": "Why Europe is so vulnerable to Russia, why it was preventable, and what the US must do to avoid the same fate",
    "id": 51,
    "date": "2020-12-26T00:00:00.000000Z",
    "views": 164770,
    "slug": "talking-points-on-how-europes-extreme-vulnerability-to-russia-was-totally-preventable",
    "image": "image-11.jpg"
  },
  {
    "title": "Talking Points on the dangerous Executive Order no one is talking about",
    "description": "Last month, President Biden issued a \"net zero\" Executive Order that threatens the very existence of our nation. And yet he has received very little pushback.",
    "id": 52,
    "date": "2020-10-17T00:00:00.000000Z",
    "views": 283327,
    "slug": "talking-points-on-the-dangerous-executive-order-no-one-is-talking-about",
    "image": "image-16.jpg"
  },
  {
    "title": "Talking Points on the media disinformation campaign to resurrect Build Back Better",
    "description": "Senator Joe Manchin heroically opposed the \"Build Back Better\" plan of his fellow Democrats. Now the media is trying to make him fold by pretending that coal-destroying BBB is good for WV coal miners",
    "id": 53,
    "date": "2020-11-13T00:00:00.000000Z",
    "views": 65487,
    "slug": "talking-points-on-the-media-disinformation-campaign-to-resurrect-build-back-better",
    "image": "image-20.jpg"
  },
  {
    "title": "It's time for Larry Fink to come clean about fossil fuels",
    "description": "A previously-unreleased pro-oil/gas letter sent by BlackRock to Texas lawmakers and oil/gas executives reveals a major contradiction",
    "id": 54,
    "date": "2021-01-12T00:00:00.000000Z",
    "views": 619448,
    "slug": "its-time-for-larry-fink-to-come-clean-about-fossil-fuels",
    "image": "image-3.jpg"
  },
  {
    "title": "Talking Points on the anti-energy, anti-development, and anti-America ESG movement",
    "description": "ESG poses as a moral and financially savvy movement. In reality it is an immoral and financially ruinous movement that is destroying the free world's ability to produce low-cost, reliable energy.",
    "id": 55,
    "date": "2022-10-24T00:00:00.000000Z",
    "views": 792085,
    "slug": "talking-points-on-the-antienergy-antidevelopment-and-antiamerica-esg-movement",
    "image": "image-39.jpg"
  },
  {
    "title": "Talking Points on \"Don't Look Up\"",
    "description": "The big-budget Netflix movie's support for eliminating fossil fuels, not fossil fuels, is the threat to life on Earth",
    "id": 56,
    "date": "2019-08-09T00:00:00.000000Z",
    "views": 150479,
    "slug": "talking-points-on-dont-look-up",
    "image": "image-24.jpg"
  },
  {
    "title": "Talking Points on the Kentucky tornado",
    "description": "Contrary to the propaganda that the White House and mainstream media are spreading, fossil fuels have made us far safer from climate-related disasters such as tornadoes.",
    "id": 57,
    "date": "2019-06-15T00:00:00.000000Z",
    "views": 660421,
    "slug": "talking-points-on-the-kentucky-tornado",
    "image": "image-28.jpg"
  },
  {
    "title": "Why Build Back Better will be an unmitigated disaster for West Virginia",
    "description": "An open letter to Senator Joe Manchin",
    "id": 58,
    "date": "2021-05-03T00:00:00.000000Z",
    "views": 732384,
    "slug": "why-build-back-better-will-be-an-unmitigated-disaster-for-west-virginia",
    "image": "image-28.jpg"
  },
  {
    "title": "An open letter to Elizabeth Warren on natural gas prices",
    "description": "Senator Warren blamed natural gas CEOs for rising prices. Here\u2019s how I would respond if I were them.",
    "id": 59,
    "date": "2023-05-25T00:00:00.000000Z",
    "views": 380904,
    "slug": "an-open-letter-to-elizabeth-warren-on-natural-gas-prices",
    "image": "image-41.jpg"
  },
  {
    "title": "Talking Points on the dangerous falsehood that \"Climate change is a public health issue\"",
    "description": "\"Climate change is a public health issue\" is a dangerous new refrain that is being used to justify some truly evil policies--including a government mandate to restrict hospitals' electricity use if the CO2 emissions are deemed to be too high!",
    "id": 60,
    "date": "2019-12-05T00:00:00.000000Z",
    "views": 864685,
    "slug": "talking-points-on-the-dangerous-falsehood-that-climate-change-is-a-public-health-issue",
    "image": "image-3.jpg"
  },
  {
    "title": "Talking Points on Medical Journal Editors\u2019 false climate narrative",
    "description": "The editors of 220 medical journals called for the rapid elimination of fossil fuels because of their climate impacts. But even if they were right on their predictions of health impacts from climate change, they are failing to see that their niche expertise is only a small part of the story about climate and human flourishing.",
    "id": 61,
    "date": "2019-10-17T00:00:00.000000Z",
    "views": 350656,
    "slug": "talking-points-on-medical-journal-editors-false-climate-narrative",
    "image": "image-11.jpg"
  },
  {
    "title": "Talking Points on skyrocketing oil and gasoline prices",
    "description": "Skyrocketing oil and gasoline prices are a failure of anti-oil politicians, who artificially restricted the supply of oil",
    "id": 62,
    "date": "2019-06-27T00:00:00.000000Z",
    "views": 678800,
    "slug": "talking-points-on-skyrocketing-oil-and-gasoline-prices",
    "image": "image-38.jpg"
  },
  {
    "title": "Talking Points on the need for NEPA reform",
    "description": "As the infrastructure deal moves forward, it is important to keep pointing out that we still need NEPA reform--and that without it, infrastructure can't improve very much. Here are my talking points on NEPA.",
    "id": 63,
    "date": "2022-01-21T00:00:00.000000Z",
    "views": 484827,
    "slug": "talking-points-on-the-need-for-nepa-reform",
    "image": "image-42.jpg"
  },
  {
    "title": "Talking Points for this year's Thanksgiving conversations",
    "description": "Need talking points for this year's Thanksgiving energy/climate conversations?",
    "id": 64,
    "date": "2023-11-10T00:00:00.000000Z",
    "views": 439888,
    "slug": "talking-points-for-this-years-thanksgiving-conversations",
    "image": "image-40.jpg"
  },
  {
    "title": "Talking Points on the reconciliation bill, part 3: EV subsidies",
    "description": "This is part 3 of my series \u201cHow passing the reconciliation bill will destroy American energy.\u201d This horrific bill has at least 6 energy-destroying policies that alone should disqualify it from passage\u2014including the increase in electric vehicle subsidies.",
    "id": 65,
    "date": "2020-03-08T00:00:00.000000Z",
    "views": 505318,
    "slug": "talking-points-on-the-reconciliation-bill-part-3-ev-subsidies",
    "image": "image-3.jpg"
  },
  {
    "title": "Talking Points on the COP 26 Agreement",
    "description": "Before and during COP 26, I have claimed that it is not a scientific conference but a pseudoscientific, anti-human conference that is pursuing mass-genocide.",
    "id": 66,
    "date": "2023-10-12T00:00:00.000000Z",
    "views": 886282,
    "slug": "talking-points-on-the-cop-26-agreement",
    "image": "image-18.jpg"
  },
  {
    "title": "Talking Points on the reconciliation bill, part 2: the 10-year extension of solar and wind subsidies",
    "description": "This is part 2 of my series \u201cHow passing the reconciliation bill will destroy American energy.\u201d This horrific bill has at least 6 energy-destroying policies that alone should disqualify it from passage\u2014including the extension and increase of solar and wind subsidies.",
    "id": 67,
    "date": "2019-06-30T00:00:00.000000Z",
    "views": 81580,
    "slug": "talking-points-on-the-reconciliation-bill-part-2-the-10year-extension-of-solar-and-wind-subsidies",
    "image": "image-2.jpg"
  },
  {
    "title": "Talking Points on the reconciliation bill, part 1: \"80% clean electricity by 2030\"",
    "description": "The reconciliation bill\u2019s goal of 80% \"clean electricity\" by 2030, which has still not been abandoned, would mean going from 10% unreliable solar+wind to a catastrophic 50% solar+wind in 8 years.",
    "id": 68,
    "date": "2023-02-13T00:00:00.000000Z",
    "views": 843199,
    "slug": "talking-points-on-the-reconciliation-bill-part-1-80-clean-electricity-by-2030",
    "image": "image-14.jpg"
  },
  {
    "title": "Talking Points on COP 26, 1.5\u00b0C pseudoscience",
    "description": "While COP 26 is drawing criticism for \u201cfailing\u201d to \u201cachieve\u201d its goals, this conference is still pushing the world in the deadly direction of eliminating fossil fuel use.",
    "id": 69,
    "date": "2021-12-11T00:00:00.000000Z",
    "views": 704339,
    "slug": "talking-points-on-cop-26-15c-pseudoscience",
    "image": "image-5.jpg"
  },
  {
    "title": "Talking Points on oil companies \"spreading climate disinformation\"",
    "description": "The House is holding a hearing to threaten \u201cBig Oil\u201d for spreading \u201cclimate disinformation\u201d\u2014i.e., for expressing the opinion that CO2 emissions would not be catastrophic, an opinion that turned out to be right. This hearing is therefore an attack on free speech and on reality.",
    "id": 70,
    "date": "2021-04-25T00:00:00.000000Z",
    "views": 114609,
    "slug": "talking-points-on-oil-companies-spreading-climate-disinformation",
    "image": "image-42.jpg"
  },
  {
    "title": "Talking Points on the \"Other countries have 80% clean electricity\" argument",
    "description": "The most persuasive argument being used for the horrifically destructive policy of 80% \u201cclean electricity\u201d by 2030\u2014the goal of the Clean Electricity Performance Program of the reconciliation bill\u2014is that other countries have already achieved this. These talking points completely refute this argument and call out some of the \u201cexperts\u201d who are shamefully making it.",
    "id": 71,
    "date": "2021-05-16T00:00:00.000000Z",
    "views": 89724,
    "slug": "talking-points-on-the-other-countries-have-80-clean-electricity-argument",
    "image": "image-6.jpg"
  },
  {
    "title": "Talking Points on the natural gas crisis from the CEO of America's biggest natural gas producer",
    "description": "As Europe and the world continue to experience a natural gas crisis, those most responsible for the crisis\u2014those who oppose the production and transport of natural gas\u2014are scrambling to blame everyone and everything but themselves.",
    "id": 72,
    "date": "2020-12-02T00:00:00.000000Z",
    "views": 46728,
    "slug": "talking-points-on-the-natural-gas-crisis-from-the-ceo-of-americas-biggest-natural-gas-producer",
    "image": "image-14.jpg"
  },
  {
    "title": "Talking Points on the California Oil Spill",
    "description": "The oil spill in Southern California, very near where I live, is being used (abused) to call for anti-oil policies, including a ban on California offshore drilling. Here are my talking points on what actually happened and what the proper response is.",
    "id": 73,
    "date": "2022-11-07T00:00:00.000000Z",
    "views": 658110,
    "slug": "talking-points-on-the-california-oil-spill",
    "image": "image-40.jpg"
  },
  {
    "title": "Talking Points on how the reconciliation bill will create mass \"green joblessness\"",
    "description": "The reconciliation bill is being pitched as a big job-creator. In fact it will destroy far more well-paying US jobs than it creates...",
    "id": 74,
    "date": "2022-09-12T00:00:00.000000Z",
    "views": 963386,
    "slug": "talking-points-on-how-the-reconciliation-bill-will-create-mass-green-joblessness",
    "image": "image-27.jpg"
  },
  {
    "title": "Talking Points on how Europe's fracking bans have contributed to its natural gas crisis",
    "description": "As natural gas shortages and skyrocketing prices harm Europe, those most responsible for the crisis\u2014those who oppose the production and transport of natural gas\u2014are shifting the blame from themselves by claiming that the situation is \u201ccomplex.\u201d But it\u2019s not. It\u2019s simple: if it hadn\u2019t been for major global restrictions on the production and transport of natural gas, natural gas supply could meet demand. The talking points below provide clear documentation of how Europe has destroyed much of its ability to supply itself with natural gas. They should help those of us in the US to use Europe as a cautionary tale against the current anti-fossil fuel agenda.",
    "id": 75,
    "date": "2022-10-11T00:00:00.000000Z",
    "views": 104059,
    "slug": "talking-points-on-how-europes-fracking-bans-have-contributed-to-its-natural-gas-crisis",
    "image": "image-42.jpg"
  },
  {
    "title": "Talking Points on Skyrocketing Natural Gas and Coal Prices",
    "description": "Skyrocketing natural gas and coal prices are not a failure of the fossil fuel industry, but the total failure of anti-fossil fuel policies, which falsely promised that if we dramatically restricted fossil fuel energy production, green energy could easily replace it.",
    "id": 76,
    "date": "2022-04-19T00:00:00.000000Z",
    "views": 207571,
    "slug": "talking-points-on-skyrocketing-natural-gas-and-coal-prices",
    "image": "image-24.jpg"
  },
  {
    "title": "Talking Points on Nations not Meeting their Climate Targets",
    "description": "Today the news is panicking over a UN report that says nations are not meeting the greenhouse gas reduction targets (\u201cNDCs\u201d) they said they would to avoid 1.5 or 2\u00b0 total warming since the 1800s. But these targets were deadly and impossible, so it\u2019s good and unsurprising news.",
    "id": 77,
    "date": "2020-07-06T00:00:00.000000Z",
    "views": 868579,
    "slug": "talking-points-on-nations-not-meeting-their-climate-targets",
    "image": "image-39.jpg"
  },
  {
    "title": "Talking Points on the IPCC's 6th Assessment Report",
    "description": "The leadership of the UN claims that the recent UN climate report is a scientifically proven \"code red for humanity\" that requires rapidly eliminating fossil fuels. In fact the report is extreme speculation that even if true would justify using more fossil fuels, not less.",
    "id": 78,
    "date": "2023-08-11T00:00:00.000000Z",
    "views": 119915,
    "slug": "talking-points-on-the-ipccs-6th-assessment-report",
    "image": "image-20.jpg"
  },
  {
    "title": "Talking Points on the Truth about the UN IPCC",
    "description": "The IPCC is not primarily a scientific organization, it is primarily a religious and political organization that manipulates science--including the work of many good scientists--to achieve the anti-human goal of eliminating human impact on nature.",
    "id": 79,
    "date": "2019-04-12T00:00:00.000000Z",
    "views": 211315,
    "slug": "talking-points-on-the-truth-about-the-un-ipcc",
    "image": "image-11.jpg"
  },
  {
    "title": "Talking Points on a Positive Alternative to ESG",
    "description": "Introducing LVC -- Long-term Value Creation.",
    "id": 80,
    "date": "2022-09-18T00:00:00.000000Z",
    "views": 12982,
    "slug": "talking-points-on-a-positive-alternative-to-esg",
    "image": "image-13.jpg"
  },
  {
    "title": "Talking Points on 30 by 30",
    "description": "Anti-development policies on America's federal lands have created crisis after crisis: from forests with deadly \"fuel loads\" to dependence on China for vital materials. The Biden Administration's anti-development \"30 by 30\" plan would make our public lands crisis far worse.",
    "id": 81,
    "date": "2020-01-11T00:00:00.000000Z",
    "views": 504751,
    "slug": "talking-points-on-30-by-30",
    "image": "image-18.jpg"
  },
  {
    "title": "Talking Points on Resilience",
    "description": "We need an electric grid that provides power when we need it, even under adverse conditions.",
    "id": 82,
    "date": "2020-09-17T00:00:00.000000Z",
    "views": 14328,
    "slug": "talking-points-on-resilience",
    "image": "image-14.jpg"
  },
  {
    "title": "Talking Points on LNG Exports",
    "description": "One of the most obvious opportunities the US is currently squandering is the export of LNG--liquefied natural gas. LNG can provide low-cost, reliable, clean natural gas around the world. But LNG's enormous potential is being strangled by irrational permitting policies.",
    "id": 83,
    "date": "2021-04-25T00:00:00.000000Z",
    "views": 336078,
    "slug": "talking-points-on-lng-exports",
    "image": "image-37.jpg"
  },
  {
    "title": "Talking Points on Infrastructure",
    "description": "The top priority of a proper infrastructure plan would be liberating the construction of American highways--which are unnecessarily congested, slow, and expensive due to anti-development policies. Biden's \"infrastructure plan\" would slow highway construction even more.",
    "id": 84,
    "date": "2021-04-11T00:00:00.000000Z",
    "views": 743314,
    "slug": "talking-points-on-infrastructure",
    "image": "image-1.jpg"
  },
  {
    "title": "Talking Points on a Clean Energy Standard",
    "description": "In my career studying energy, I have never been more scared of a government policy than I am of the Federal Government's push for a \"CES\"--\"Clean Energy Standard\" that would dictatorially mandate 80% \"clean,\" including 50+% unreliable solar and wind, electricity, by 2030.",
    "id": 85,
    "date": "2019-05-27T00:00:00.000000Z",
    "views": 962089,
    "slug": "talking-points-on-a-clean-energy-standard",
    "image": "image-27.jpg"
  },
  {
    "title": "Talking Points on Biden\u2019s executive order on EVs",
    "description": "The proper policy toward EVs, which are promising but not cost-effective for the vast majority of Americans, is 1) let them compete on a free market and 2) make sure we have plenty of low-cost, reliable electricity. Our President's new Executive Order does the exact opposite.",
    "id": 86,
    "date": "2019-05-01T00:00:00.000000Z",
    "views": 754491,
    "slug": "talking-points-on-bidens-executive-order-on-evs",
    "image": "image-31.jpg"
  },
  {
    "title": "Alex Epstein Congressional Testimony for June 30, 2021",
    "description": "This is Alex Epstein's testimony for a hearing by the House Natural Resources Committee on June 30, 2021.",
    "id": 87,
    "date": "2022-10-01T00:00:00.000000Z",
    "views": 242040,
    "slug": "alex-epstein-congressional-testimony-for-june-30-2021",
    "image": "image-21.jpg"
  },
  {
    "title": "Talking Points on ESG Divestment",
    "description": "The ESG divestment movement poses as a long-range, financially savvy, and moral movement. In reality it is a short-range, financially ruinous, and deeply immoral movement that perpetuates poverty in the poorest places and threatens the security of the free world.",
    "id": 88,
    "date": "2022-10-19T00:00:00.000000Z",
    "views": 991084,
    "slug": "talking-points-on-esg-divestment",
    "image": "image-22.jpg"
  },
  {
    "title": "Alex Epstein Congressional Testimony for May 19, 2021",
    "description": "This is Alex Epstein's testimony for a hearing by the House Natural Resources Committee on May 19, 2021.",
    "id": 89,
    "date": "2022-08-25T00:00:00.000000Z",
    "views": 530330,
    "slug": "alex-epstein-congressional-testimony-for-may-19-2021",
    "image": "image-24.jpg"
  },
  {
    "title": "Talking Points on the Texas Electricity Crisis",
    "description": "There is a lot of conflicting \"information\" about the TX blackouts. Here's the bottom line: the root cause of the TX blackouts is a national and state policy that has prioritized the adoption of unreliable wind/solar energy over reliable energy.",
    "id": 90,
    "date": "2022-03-28T00:00:00.000000Z",
    "views": 805995,
    "slug": "talking-points-on-the-texas-electricity-crisis",
    "image": "image-35.jpg"
  },
  {
    "title": "Talking Points on the Energy Transition",
    "description": "Q: Aren't we in a rapid free-market energy transition from fossil fuels to solar and wind?",
    "id": 91,
    "date": "2021-04-18T00:00:00.000000Z",
    "views": 135340,
    "slug": "talking-points-on-the-energy-transition",
    "image": "image-0.jpg"
  },
  {
    "title": "Talking Points on Green Energy Jobs",
    "description": "Joe Biden's energy plan would shift us from energy production that is low-cost, high-reliability, and America-centered to energy production that is high-cost, low-reliability, and China-centered.",
    "id": 92,
    "date": "2022-01-19T00:00:00.000000Z",
    "views": 825105,
    "slug": "talking-points-on-green-energy-jobs",
    "image": "image-12.jpg"
  },
  {
    "title": "Talking Points on Carbon Tax Proposals",
    "description": "Q: Won't a carbon tax reduce CO2 emissions without hurting our economy?",
    "id": 93,
    "date": "2022-04-29T00:00:00.000000Z",
    "views": 749870,
    "slug": "talking-points-on-carbon-tax-proposals",
    "image": "image-26.jpg"
  },
  {
    "title": "Snappy Answers to Energy Questions",
    "description": "Quick and direct answers to common questions you're likely to encounter about energy technologies.",
    "id": 94,
    "date": "2021-09-04T00:00:00.000000Z",
    "views": 803200,
    "slug": "snappy-answers-to-energy-questions",
    "image": "image-42.jpg"
  },
  {
    "title": "Snappy Answers to Climate Questions",
    "description": "Quick and direct answers to common questions you're likely to encounter about climate change.",
    "id": 95,
    "date": "2021-07-13T00:00:00.000000Z",
    "views": 120027,
    "slug": "snappy-answers-to-climate-questions",
    "image": "image-39.jpg"
  },
  {
    "title": "Talking Points on American Energy Policy",
    "description": "In the last 15 years America has become the world\u2019s leading energy producer thanks to energy freedom -- allowing all sources of energy to compete and innovate. To make even more progress we need more energy freedom -- not mandates of renewables or bans of fossil fuels and nuclear.",
    "id": 96,
    "date": "2020-11-28T00:00:00.000000Z",
    "views": 799784,
    "slug": "talking-points-on-american-energy-policy",
    "image": "image-29.jpg"
  },
  {
    "title": "Talking Points on Joe Biden's Energy Plan",
    "description": "Joe Biden\u2019s energy plan calls for outlawing reliable fossil fuel electricity and mandating unreliable solar and wind electricity. This will not stop CO2 emissions from rising but it will destroy American industry, impoverish American consumers, and jeopardize American security.",
    "id": 97,
    "date": "2020-12-06T00:00:00.000000Z",
    "views": 628209,
    "slug": "talking-points-on-joe-bidens-energy-plan",
    "image": "image-14.jpg"
  },
  {
    "title": "Talking Points on California Blackouts",
    "description": "California is experiencing blackouts because of \"green\" policies that reward or mandate unreliable electricity from solar and wind and punish or outlaw reliable electricity from nuclear, natural gas, coal, or hydro. We need to understand and apply this lesson this election.",
    "id": 98,
    "date": "2019-01-24T00:00:00.000000Z",
    "views": 331557,
    "slug": "talking-points-on-california-blackouts",
    "image": "image-16.jpg"
  },
  {
    "title": "Talking Points on California Wildfires",
    "description": "The solution to dangerous, out-of-control wildfires in California is addressing the root cause: \u201cexcess fuel load\u201d from bad forest management. Focusing on climate change, a minor variable that we have no near-term control over, is a craven political ploy.",
    "id": 99,
    "date": "2019-07-09T00:00:00.000000Z",
    "views": 71918,
    "slug": "talking-points-on-california-wildfires",
    "image": "image-38.jpg"
  },
  {
    "title": "Talking Points on Fracking",
    "description": "Fracking is one of the most important technologies in our economy and can be done very safely. Government should ban only dangerous misuses of fracking, not all fracking. A fracking ban is the fastest way to create a global recession and an American depression.",
    "id": 100,
    "date": "2023-09-11T00:00:00.000000Z",
    "views": 475199,
    "slug": "talking-points-on-fracking",
    "image": "image-0.jpg"
  },
  {
    "title": "Talking Points on the So-Called Climate Crisis",
    "description": "While climate catastrophists claim that our climate is less livable than ever because of fossil fuels, it is actually more livable than ever thanks to our fossil fuel powered climate protection systems. Rising CO2 levels will cause mild, manageable warming as well as significant global greening--not a crisis.",
    "id": 101,
    "date": "2022-08-26T00:00:00.000000Z",
    "views": 314320,
    "slug": "talking-points-on-the-socalled-climate-crisis",
    "image": "image-12.jpg"
  },
  {
    "title": "Talking Points on CO2 Emissions",
    "description": "The only practical way to lower global CO2 emissions is to encourage innovation that could make low-carbon energy cheap for everyone. Policies like the Green New Deal and the Biden Plan that would outlaw American fossil fuel use won\u2019t stop global CO2 emissions from rising--but they will ruin America.",
    "id": 102,
    "date": "2021-11-11T00:00:00.000000Z",
    "views": 23686,
    "slug": "talking-points-on-co2-emissions",
    "image": "image-29.jpg"
  },
  {
    "title": "Talking Points on Energy Poverty",
    "description": "10s of millions of Americans live in energy poverty--a growing problem thanks to wasteful, unreliable solar and wind infrastructure. If we want to stop making our poorest citizens choose between food and heat or medicine and electricity we must end favoritism for \u201cunreliables.\u201d",
    "id": 103,
    "date": "2023-07-28T00:00:00.000000Z",
    "views": 103013,
    "slug": "talking-points-on-energy-poverty",
    "image": "image-16.jpg"
  },
  {
    "title": "Talking Points on Wind Production Tax Credit",
    "description": "The Wind Production Tax Credit is a perverse policy that pays utilities to slow down or shut down reliable power plants whenever the wind blows. It is driving reliable power plants out of business, leading to higher costs and lower reliability.",
    "id": 104,
    "date": "2020-09-22T00:00:00.000000Z",
    "views": 825034,
    "slug": "talking-points-on-wind-production-tax-credit",
    "image": "image-5.jpg"
  },
  {
    "title": "The \"fossil fuels cause 1 in 5 deaths\" myth",
    "description": "The widely-publicized claim that fossil fuels cause 1 in 5 deaths is the worst kind of pseudoscience. It ignores fossil fuels' life-extending benefits and wildly overstates their negative side-effects. In reality, fossil fuels lengthen 5 out of 5 lives.",
    "id": 105,
    "date": "2021-12-29T00:00:00.000000Z",
    "views": 932480,
    "slug": "the-fossil-fuels-cause-1-in-5-deaths-myth",
    "image": "image-12.jpg"
  },
  {
    "title": "How the Biden Administration threatens energy security",
    "description": "Joe Biden's escalating bans on domestic fossil fuel production, combined with mandates of unreliable solar and wind overwhelmingly produced by unreliable China, are an existential threat to our energy security and therefore our national security.",
    "id": 106,
    "date": "2020-01-10T00:00:00.000000Z",
    "views": 292443,
    "slug": "how-the-biden-administration-threatens-energy-security",
    "image": "image-37.jpg"
  },
  {
    "title": "7 bad consequences of Biden\u2019s oil and gas leasing moratorium",
    "description": "Biden\u2019s ban on oil/gas leasing on federal lands is a dictatorial measure that will 1) increase US energy costs, 2) decrease US energy security, 3) destroy US companies, 4) destroy US jobs, 5) discourage US industry, 6) decrease US tax revenue, and 7) increase global emissions.",
    "id": 107,
    "date": "2023-03-06T00:00:00.000000Z",
    "views": 562604,
    "slug": "7-bad-consequences-of-bidens-oil-and-gas-leasing-moratorium",
    "image": "image-0.jpg"
  },
  {
    "title": "Talking Points on the CLEAN Future Act",
    "description": "The House Democrats' \"CLEAN Future\" Act, by forcing us to depend mostly on unreliable wind and solar, would destroy our standard of living--and global emissions would still rise. It should be rejected in favor of an aggressive nuclear decriminalization policy.",
    "id": 108,
    "date": "2022-01-01T00:00:00.000000Z",
    "views": 850576,
    "slug": "talking-points-on-the-clean-future-act",
    "image": "image-33.jpg"
  },
  {
    "title": "Talking Points on Federal Electricity Regulation",
    "description": "Q: Is the solution to TX's reliability problems to join the national grid and be regulated by the Federal government?",
    "id": 109,
    "date": "2022-07-20T00:00:00.000000Z",
    "views": 822949,
    "slug": "talking-points-on-federal-electricity-regulation",
    "image": "image-15.jpg"
  },
  {
    "title": "Talking Points on Flaring",
    "description": "The widely-condemned \"flaring\" of natural gas is a vital safety measure that decreases the energy efficiency of US drilling by less than 1%. And that number would be far lower without the infrastructure-blocking of anti-fossil fuel activists who claim to oppose flaring.",
    "id": 110,
    "date": "2019-02-22T00:00:00.000000Z",
    "views": 197499,
    "slug": "talking-points-on-flaring",
    "image": "image-11.jpg"
  },
  {
    "title": "Talking Points on the Paris Climate Accords",
    "description": "Background The Paris Climate Accords are a 2015 international agreement in which countries committed to specific short-term cuts in CO2 emissions along with the general goal of somehow eliminating almost all human-caused CO2 emissions by 2050. These emissions cuts are allegedly necessary to keep the average temperature from increasing by more than 1 degree C or more (2 degrees since preindustrial\u2026",
    "id": 111,
    "date": "2019-01-09T00:00:00.000000Z",
    "views": 678332,
    "slug": "talking-points-on-the-paris-climate-accords",
    "image": "image-2.jpg"
  },
  {
    "title": "Talking Points on Energy Subsidies",
    "description": "Unreliable energy sources receive dozens of times greater subsidies than fossil fuels, in addition to other unfair advantages. Without these, they would hardly be used at all.",
    "id": 112,
    "date": "2019-03-12T00:00:00.000000Z",
    "views": 699642,
    "slug": "talking-points-on-energy-subsidies",
    "image": "image-21.jpg"
  }
]

const IndexPage = ({ data }) => {
  const [index, setIndex] = useState(new FlexSearch.Document({
    document: {
      id: "id",
      index: [{
        field: "title",
        tokenize: "full",
        optimize: true,
        minlength: 3,
        resolution: 9,
        context: true,
      }, {
        field: "description",
        tokenize: "strict",
        context: {
          resolution: 5,
          depth: 3,
          bidirectional: true
        },
        optimize: true,
        resolution: 9,
        minlength: 3,
      }]
    },
    tokenize: function (str) {

      return str.split(/\s-\//g);
    }
  }));

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    console.log(data);
    talkingPoints.forEach((item) => {
      index.add({ id: item.id, title: item.title, description: item.description });
    });
    setIndex(index);
  }, [data]);

  //  When the query from the search input changes, we want to update the query state and thus the results to display. 

  useEffect(() => {
    const searchResults = index.search(query);
    // setResults(index.search(query));
    console.log(searchResults)
    if (searchResults[0] && searchResults[1]) {
      setResults(Array.from(new Set([...searchResults[0].result, ...searchResults[1].result])));
    } else if (searchResults[0]) {
      setResults(searchResults[0].result);
    } else {
      setResults(searchResults);
    }
  }, [query]);

  return (


    <section class="bg-white dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
      <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
        <a href="/" class="inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800">
          <span class="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 me-3">New</span> <span class="text-sm font-medium">Jumbotron component was launched! See what's new</span>
          <svg class="w-2.5 h-2.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
          </svg>
        </a>
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">We invest in the world’s potential</h1>
        <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
        <form class="w-full max-w-md mx-auto">
          <label for="search-query" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div class="relative">
            <input type="text" id="search-query" value={query} onChange={(e) => setQuery(e.target.value)} class="block w-full p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for talking points..." required />
            <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
        </form>
      </div>
      <ul>
        {results.map((result) => (
          <li class="title" key={result}>
            {console.log(result)}
            {talkingPoints[result].title}
          </li>
        ))}
      </ul>
      <div class="bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900 w-full h-full absolute top-0 left-0 z-0"></div>
    </section>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>

export const indexPageQuery = graphql`
  query IndexPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
