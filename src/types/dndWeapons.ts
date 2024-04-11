
export enum weaponTypes {
    SimpleMelee = "Simple Melee",
    SimpleRanged = "Simple Ranged",
    MartialMelee = "Martial Melee",
    MartialRanged = "Martial Ranged",
    Firearms = "Firearms",
}

export const weapons = [
    {
        "Name": "Crossbow, light",
        "Cost": "25 gp",
        "Damage": "1d8 piercing",
        "Weight": "5 lb",
        "Properties": [
            "Ammunition (80/320)",
            "Loading",
            "Two-Handed"
        ],
        type: weaponTypes.SimpleRanged
    },
    {
        "Name": "Dart",
        "Cost": "5 cp",
        "Damage": "1d4 piercing",
        "Weight": "0.25 lb",
        "Properties": [
            "Finesse",
            "Thrown (20/60)"
        ],
        type: weaponTypes.SimpleRanged
    },
    {
        "Name": "Shortbow",
        "Cost": "25 gp",
        "Damage": "1d6 piercing",
        "Weight": "2 lb",
        "Properties": [
            "Ammunition (80/320)",
            "Two-handed"
        ],
        type: weaponTypes.SimpleRanged
    },
    {
        "Name": "Sling",
        "Cost": "1 sp",
        "Damage": "1d4 bludgeoning",
        "Weight": "",
        "Properties": [
            "Ammunition (30/120)"
        ],
        type: weaponTypes.SimpleRanged
    },
	{
        "Name": "Slingstaff",
        "Cost": "2 sp",
        "Damage": "1d6 bludgeoning",
        "Weight": "2 lb",
        "Properties": [
            "Ammunition (30/120)",
            "Two-handed"
        ],
        type: weaponTypes.SimpleRanged
    },

    {
        "Name": "Barbed Dagger",
        "Cost": "10 gp",
        "Damage": "2d4",
        "Damagetype": "Piercing",
        "Weight": "1 lb",
        "Homebrew": "True",
        "Properties": [
            "Light", 
            "Finesse", 
            "Thrown (20/60)"
        ],
        type: weaponTypes.SimpleMelee,
    },
    {
        "Name": "Brandistock",
        "Cost": "10 gp",
        "Damage": "1d8",
        "Damagetype": "Piercing",
        "Weight": "4 lb",
        "Homebrew": "True",
        "Properties": [
            "Special",
            "Two-handed"
        ],
        type: weaponTypes.SimpleMelee
    },
    {
        "Name": "Broken Sword",
        "Cost": "5 sp",
        "Damage": "1d4",
        "Damagetype": "Piercing",
        "Weight": "1 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Light", 
            "Finesse"
        ],
        type: weaponTypes.SimpleMelee
    },
    {
        "Name": "Cestus",
        "Cost": "5 sp",
        "Damage": "1d4",
        "Damagetype": "Bludgeoning",
        "Weight": "0.5 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Light", 
            "Special"
        ],
        type: weaponTypes.SimpleMelee
    },
    {
        "Name": "Club",
        "Cost": "1 sp",
        "Damage": "1d4",
        "Damagetype": "Bludgeoning",
        "Weight": "2 lb",
        "Homebrew": "False",
        "Properties": [ 
            "Light"
        ],
        type: weaponTypes.SimpleMelee
    },
    {
        "Name": "Dagger",
        "Cost": "2 gp",
        "Damage": "1d4",
        "Damagetype": "Piercing",
        "Weight": "1 lb",
        "Homebrew": "False",
        "Properties": [ 
            "Light", 
            "Finesse",
            "Thrown (20/60)"
        ],
        type: weaponTypes.SimpleMelee
    },
    {
        "Name": "Double Spear",
        "Cost": "5 gp",
        "Damage": "1d6",
        "Damagetype": "Piercing",
        "Weight": "4 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Versatile (1d8)", 
            "Thrown (20/60)"
        ],
        type: weaponTypes.SimpleMelee
    },
    {
        "Name": "Eye Sickle",
        "Cost": "10 gp",
        "Damage": "1d6",
        "Damagetype": "Piercing",
        "Weight": "4 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Light", 
            "Finesse"
        ],
        type: weaponTypes.SimpleMelee
    },
    {
        "Name": "Falx",
        "Cost": "8 gp",
        "Damage": "1d6",
        "Damagetype": "Slashing",
        "Weight": "3 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Versatile (1d8)"
        ],
        type: weaponTypes.SimpleMelee
    },
    {
        "Name": "Fauchard",
        "Cost": "10 gp",
        "Damage": "1d6",
        "Damagetype": "Slashing",
        "Weight": "7 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Heavy", 
            "reach",
            "Two-handed"
        ],
        type: weaponTypes.SimpleMelee
    },
    {
        "Name": "Flamberge",
        "Cost": "15 gp",
        "Damage": "1d8 + 1d2",
        "Damagetype": "Slashing + Ripping",
        "Weight": "6 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Ripping", 
            "Two-handed"
        ],
        type: weaponTypes.SimpleMelee
    },
    {
        "Name": "Gavel",
        "Cost": "5 sp",
        "Damage": "1d4",
        "Damagetype": "Bludgeoning",
        "Weight": "0.5 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Undersized"
        ],
        type: weaponTypes.SimpleMelee
    },
    {
        "Name": "Greatclub",
        "Cost": "2 sp",
        "Damage": "1d8",
        "Damagetype": "Bludgeoning",
        "Weight": "10 lb",
        "Homebrew": "False",
        "Properties": [ 
            "Two-handed"
        ],
        type: weaponTypes.SimpleMelee
    },
    {
        "Name": "Greatspear",
        "Cost": "25 gp",
        "Damage": "1d10",
        "Damagetype": "Piercing",
        "Weight": "8 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Oversized",
            "Thrown (20/60)", 
            "Two-handed"
        ],
        type: weaponTypes.SimpleMelee
    },
    {
        "Name": "Handaxe",
        "Cost": "5 gp",
        "Damage": "1d6",
        "Damagetype": "Slashing",
        "Weight": "2 lb",
        "Homebrew": "False",
        "Properties": [ 
            "Light", 
            "Thrown (20/60)" 
        ],
        type: weaponTypes.SimpleMelee
    },
    {
        "Name": "Iron Claws",
        "Cost": "5 gp",
        "Damage": "1d4",
        "Damagetype": "Piercing",
        "Weight": "2 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Light", 
            "Finesse"
        ],
        type: weaponTypes.SimpleMelee
    },
    {
        "Name": "Javelin",
        "Cost": "5 sp",
        "Damage": "1d6",
        "Damagetype": "Piercing",
        "Weight": "2 lb",
        "Homebrew": "False",
        "Properties": [ 
            "Thrown (30/120)"
        ],
        type: weaponTypes.SimpleMelee
    },
    {
        "Name": "Karambit",
        "Cost": "4 gp",
        "Damage": "1d4",
        "Damagetype": "Slashing",
        "Weight": "1 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Light", 
            "Finesse"
        ],
        type: weaponTypes.SimpleMelee
    },
    {
        "Name": "Katar",
        "Cost": "5 gp",
        "Damage": "1d4",
        "Damagetype": "Piercing",
        "Weight": "1 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Light", 
            "Finesse"
        ],
        type: weaponTypes.SimpleMelee
    },
    {
        "Name": "Knife",
        "Cost": "2 sp",
        "Damage": "1d3",
        "Damagetype": "Slashing",
        "Weight": "0.25 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Undersized", 
            "Finesse"
        ],
        type: weaponTypes.SimpleMelee
    },
    {
        "Name": "Knuckleduster",
        "Cost": "3 sp",
        "Damage": "Unarmed Damage + 1",
        "Damagetype": "",
        "Weight": "2 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Light", 
            "Special"
        ],
        type: weaponTypes.SimpleMelee
    },
    {
        "Name": "Ko",
        "Cost": "1 gp",
        "Damage": "1d4",
        "Damagetype": "Piercing / bludgeoning",
        "Weight": "1 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Light", 
            "Finesse",
            "Special"
        ],
        type: weaponTypes.SimpleMelee
    },
    {
        "Name": "Kukri",
        "Cost": "6 gp",
        "Damage": "1d6",
        "Damagetype": "Slashing",
        "Weight": "2 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Light", 
            "Thrown (20/60)"
        ],
        type: weaponTypes.SimpleMelee
    },
    {
        "Name": "Light Hammer",
        "Cost": "2 gp",
        "Damage": "1d4",
        "Damagetype": "Bludgeoning",
        "Weight": "2 lb",
        "Homebrew": "False",
        "Properties": [ 
            "Light",
            "Thrown (20/60)"
        ],
        type: weaponTypes.SimpleMelee
    },
    {
        "Name": "Mace",
        "Cost": "5 gp",
        "Damage": "1d6",
        "Damagetype": "Bludgeoning",
        "Weight": "2 lb",
        "Homebrew": "False",
        "Properties": [],
        type: weaponTypes.SimpleMelee
    },
    {
        "Name": "Needle",
        "Cost": "2 sp",
        "Damage": "1d4",
        "Damagetype": "Piercing",
        "Weight": "0.25 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Undersized", 
            "Finesse"
        ],
        type: weaponTypes.SimpleMelee
    },
    {
        "Name": "Quarterstaff",
        "Cost": "2 sp",
        "Damage": "1d6",
        "Damagetype": "Bludgeoning",
        "Weight": "4 lb",
        "Homebrew": "False",
        "Properties": [ 
            "Versatile (1d8)"
        ],
        type: weaponTypes.SimpleMelee
    },
    {
        "Name": "Sap",
        "Cost": "1 gp",
        "Damage": "1d4",
        "Damagetype": "Bludgeoning",
        "Weight": "2 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Light", 
            "Finesse"
        ],
        type: weaponTypes.SimpleMelee
    },
    {
        "Name": "Scythe",
        "Cost": "5 gp",
        "Damage": "2d4",
        "Damagetype": "Slashing",
        "Weight": "5 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Heavy", 
            "Two-handed"
        ],
        type: weaponTypes.SimpleMelee
    },
    {
        "Name": "Sickle",
        "Cost": "1 gp",
        "Damage": "1d4",
        "Damagetype": "Slashing",
        "Weight": "2 lb",
        "Homebrew": "False",
        "Properties": [ 
            "Light"
        ],
        type: weaponTypes.SimpleMelee
    },
    {
        "Name": "Spade",
        "Cost": "2 gp",
        "Damage": "1d4",
        "Damagetype": "Bludgeoning",
        "Weight": "4 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Versatile" 
        ],
        type: weaponTypes.SimpleMelee
    },
    {
        "Name": "Spear",
        "Cost": "1 gp",
        "Damage": "1d4",
        "Damagetype": "Slashing",
        "Weight": "3 lb",
        "Homebrew": "False",
        "Properties": [ 
            "Thrown (20/60)",
            "Versatile (1d8)"
        ],
        type: weaponTypes.SimpleMelee
    },
    {
        "Name": "Torch Mace",
        "Cost": "6 gp",
        "Damage": "1d4",
        "Damagetype": "Bludgeoning",
        "Weight": "2 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Special"
        ],
        type: weaponTypes.SimpleMelee
    },
    {
        "Name": "Torch Staff",
        "Cost": "12 gp",
        "Damage": "2d4",
        "Damagetype": "Bludgeoning",
        "Weight": "7 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Heavy", 
            "Two-handed",
            "Special"
        ],
        type: weaponTypes.SimpleMelee
    },
    {
        "Name": "Zerka",
        "Cost": "10 sp",
        "Damage": "1d8",
        "Damagetype": "Piercing",
        "Weight": "3 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Special", 
            "Finesse",
            "Thrown (40/160)"
        ],
        type: weaponTypes.SimpleMelee
    },
	{
        "Name": "Atlatl",
        "Cost": "5 gp",
        "Damage": "1d6 piercing",
        "Weight": "1 lb",
        "Properties": [
        	"Ammunition",
        	"Range (50-100)",
        	"Special"
        ],
        type: weaponTypes.MartialRanged
    },
    {
        "Name": "Blowgun",
        "Cost": "10 gp",
        "Damage": "1 piercing",
        "Weight": "1 lb",
        "Properties": [
        	"Ammunition",
        	"Range (25/100)",
        	"Loading"
        ],
        type: weaponTypes.MartialRanged
    },	
    {
        "Name": "Bolas",
        "Cost": "1 gp",
        "Damage": "1d4 bludgeoning",
        "Weight": "2 lb",
        "Properties": [
        	"Special",
        	"Thrown (20/60)"
        ],
        type: weaponTypes.MartialRanged
    },
    {
        "Name": "Boomerang",
        "Cost": "2 gp",
        "Damage": "1d4 bludgeoning",
        "Weight": "1 lb",
        "Properties": [
        	"Special",
        	"Thrown (20/60)"
        ],
        type: weaponTypes.MartialRanged
    },			
    {
        "Name": "Chakram",
        "Cost": "5 gp",
        "Damage": "1d6 slashing",
        "Weight": "0.5 lb",
        "Properties": [
        	"Finesse",
        	"Thrown (20/60)"
        ],
        type: weaponTypes.MartialRanged
    },
    {
        "Name": "Chatkcha",
        "Cost": "1 gp",
        "Damage": "1d6 slashing",
        "Weight": "2 lb",
        "Properties": [
        	"Finesse",
        	"Light",
        	"Thrown (30/120)",
        	"Special"
        ],
        type: weaponTypes.MartialRanged
    },	
    {
        "Name": "Crossbow, Hand",
        "Cost": "75 gp",
        "Damage": "1d6 piercing",
        "Weight": "3 lb",
        "Properties": [
        	"Ammunition",
        	"Range (30/120)",
        	"Light",
        	"Loading"
        ],
        type: weaponTypes.MartialRanged
    },	
    {
        "Name": "Crossbow, Heavy",
        "Cost": "50 gp",
        "Damage": "1d10 piercing",
        "Weight": "18 lb",
        "Properties": [
        	"Ammunition",
        	"Range (100/400)",
        	"Heavy",
        	"Loading",
        	"Two-Handed"
        ],
        type: weaponTypes.MartialRanged
    },	
    {
        "Name": "Crossbow, Repeating",
        "Cost": "250 gp",
        "Damage": "2d4 piercing",
        "Weight": "18 lb",
        "Properties": [
        	"Ammunition",
        	"Range (80/320)",
        	"Heavy",
        	"Two-Handed"
        ],
        type: weaponTypes.MartialRanged
    },	
    {
        "Name": "Longbow",
        "Cost": "50 gp",
        "Damage": "1d8 piercing",
        "Weight": "2 lb",
        "Properties": [
        	"Ammunition",
        	"Range (150/600)",
        	"Heavy",
        	"Two-Handed"
        ],
        type: weaponTypes.MartialRanged
    },	
    {
        "Name": "Net",
        "Cost": "1 gp",
        "Damage": "",
        "Weight": "3 lb",
        "Properties": [
        	"Special",
        	"Range (5/15)",
        	"Thrown"
        ],
        type: weaponTypes.MartialRanged
    },	
    {
        "Name": "Throwing Hammer",
        "Cost": "15 gp",
        "Damage": "1d6 bludgeoning",
        "Weight": "4 lb",
        "Properties": [
        	"Thrown (60/120)"
        ],
        type: weaponTypes.MartialRanged
    },
	{
        "Name": "Arming Sword",
        "Cost": "20 gp",
        "Damage": "1d6 piercing",
        "Weight": "3 lb",
        "Properties": [
        	"Light", 
        	"Finesse", 
        	"Versatile (1d8)"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Back Sword",
        "Cost": "10 gp",
        "Damage": "1d6 piercing",
        "Weight": "3 lb",
        "Properties": [],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Battleaxe",
        "Cost": "10 gp",
        "Damage": "1d8 slashing",
        "Weight": "4 lb",
        "Properties": [
        	"Versatile (1d10)"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Bec de Corbin",
        "Cost": "20 gp",
        "Damage": "2d4 piercing",
        "Weight": "6 lb",
        "Properties": [
        	"Heavy", 
        	"Reach", 
        	"Two-Handed"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Boar Spear",
        "Cost": "10 gp",
        "Damage": "2d6 piercing",
        "Weight": "5 lb",
        "Properties": [
        	"Heavy", 
        	"Two-Handed"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Broadsword",
        "Cost": "20 gp",
        "Damage": "2d4 piercing",
        "Weight": "3 lb",
        "Properties": [],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Buster Sword",
        "Cost": "250 gp",
        "Damage": "2d8 slashing",
        "Weight": "12 lb",
        "Properties": [
        	"Oversized", 
        	"Two-Handed"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Chaind, Bladed",
        "Cost": "8 gp",
        "Damage": "1d6 slashing",
        "Weight": "10 lb",
        "Properties": [
        	"Heavy", 
        	"Finesse",
        	"Reach", 
        	"Special",
        	"Two-Handed"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Chaind, Spiked",
        "Cost": "8 gp",
        "Damage": "1d6 piercing",
        "Weight": "10 lb",
        "Properties": [
        	"Heavy", 
        	"Finesse",
        	"Reach", 
        	"Special",
        	"Two-Handed"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Chaind, Weighted",
        "Cost": "8 gp",
        "Damage": "1d6 bludgeoning",
        "Weight": "10 lb",
        "Properties": [
        	"Heavy", 
        	"Finesse",
        	"Reach", 
        	"Special",
        	"Two-Handed"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Cutlass",
        "Cost": "10 gp",
        "Damage": "1d8 slashing",
        "Weight": "2 lb",
        "Properties": [
        	"Light"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Double Axe",
        "Cost": "30 gp",
        "Damage": "1d8 slashing",
        "Weight": "10 lb",
        "Properties": [
        	"Heavy", 
        	"Two-Handed",
        	"Double Weapon"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Double Flail",
        "Cost": "20 gp",
        "Damage": "1d8 bludgeoning",
        "Weight": "4 lb",
        "Properties": [ 
        	"Two-Handed"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Double Sword",
        "Cost": "20 gp",
        "Damage": "1d6 slashing",
        "Weight": "5 lb",
        "Properties": [
        	"Double Weapon", 
        	"Two-Handed"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Dueling Shield",
        "Cost": "15 gp",
        "Damage": "1d8 bludgeoning",
        "Weight": "10 lb",
        "Properties": [
        	"Heavy", 
        	"Special",
        	"Two-Handed"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Dwarven Ugrosh",
        "Cost": "50 gp",
        "Damage": "1d10 slashing",
        "Weight": "9 lb",
        "Properties": [
        	"Heavy", 
        	"Two-Handed"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Elven Lightblade",
        "Cost": "50 gp",
        "Damage": "1d6 piercing",
        "Weight": "1 lb",
        "Properties": [
        	"Finesse", 
        	"Light",
        	"Special"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Elven Thinblade",
        "Cost": "100 gp",
        "Damage": "1d8 piercing",
        "Weight": "1 lb",
        "Properties": [
        	"Finesse", 
        	"Special"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Epee",
        "Cost": "50 gp",
        "Damage": "1d2 piercing",
        "Weight": "1 lb",
        "Properties": [
        	"Special", 
        	"Finesse"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Estoc",
        "Cost": "25 gp",
        "Damage": "1d8 piercing",
        "Weight": "3 lb",
        "Properties": [
        	"Versatile (1d10)"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Faeblades",
        "Cost": "50 gp",
        "Damage": "2d4 slashing",
        "Weight": "2.5 lb",
        "Properties": [
        	"Light", 
        	"Finesse",
        	"Special"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Falchion",
        "Cost": "10 gp",
        "Damage": "1d8 slashing",
        "Weight": "3 lb",
        "Properties": [],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Flail",
        "Cost": "10 gp",
        "Damage": "1d8 bludgeoning",
        "Weight": "2 lb",
        "Properties": [],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Glaive",
        "Cost": "20 gp",
        "Damage": "1d10 slashing",
        "Weight": "6 lb",
        "Properties": [
            "Heavy",
            "Reach",
            "Two-Handed"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Greataxe",
        "Cost": "30 gp",
        "Damage": "1d12 slashing",
        "Weight": "7 lb",
        "Properties": [
            "Heavy",
            "Two-Handed"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Great Maul",
        "Cost": "150 gp",
        "Damage": "3d6 bludgeoning",
        "Weight": "145 lb",
        "Properties": [
        	"Oversized", 
        	"Two-Handed",
        	"Special"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Greatsword",
        "Cost": "50 gp",
        "Damage": "2d6 slashing",
        "Weight": "6 lb",
        "Properties": [
            "Heavy",
            "Two-Handed"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Guisarme",
        "Cost": "15 gp",
        "Damage": "2d4 slashing",
        "Weight": "6 lb",
        "Properties": [
        	"Heavy", 
        	"Reach",
        	"Two-Handed"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Gythka",
        "Cost": "20 gp",
        "Damage": "1d8 slashing",
        "Weight": "9 lb",
        "Properties": [
        	"Heavy", 
        	"Two-Handed"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Halberd",
        "Cost": "20 gp",
        "Damage": "1d10 slashing",
        "Weight": "6 lb",
        "Properties": [
            "Heavy",
            "Reach",
            "Two-Handed"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Heavy Flail",
        "Cost": "20 gp",
        "Damage": "1d12 bludgeoning",
        "Weight": "7 lb",
        "Properties": [
        	"Heavy", 
        	"Two-Handed"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Hidden Blade",
        "Cost": "100 gp",
        "Damage": "1d4 piercing",
        "Weight": "0.5 lb",
        "Properties": [
        	"Light", 
        	"Finesse",
        	"Special"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Katana",
        "Cost": "50 gp",
        "Damage": "1d8 slashing",
        "Weight": "3 lb",
        "Properties": [
        	"Versatile (1d10)"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Lajav",
        "Cost": "30 gp",
        "Damage": "1d8 bludgeoning",
        "Weight": "5 lb",
        "Properties": [
        	"Finesse",
        	"Heavy", 
        	"Two-Handed",
        	"Special"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Lance",
        "Cost": "10 gp",
        "Damage": "1d12 piercing",
        "Weight": "6 lb",
        "Properties": [
            "Reach",
            "Special"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Longspear",
        "Cost": "3 gp",
        "Damage": "1d6 piercing",
        "Weight": "4 lb",
        "Properties": [
        	"Heavy", 
        	"Reach",
        	"Versatile (1d8)"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Longstaff",
        "Cost": "5 sp",
        "Damage": "1d8 bludgeoning",
        "Weight": "7 lb",
        "Properties": [
        	"Heavy", 
        	"Reach",
        	"Special",
        	"Two-Handed"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Longsword",
        "Cost": "15 gp",
        "Damage": "1d8 slashing",
        "Weight": "3 lb",
        "Properties": [
            "Versatile (1d10)"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Main Gauche",
        "Cost": "5 gp",
        "Damage": "1d4 piercing",
        "Weight": "1 lb",
        "Properties": [
            "Finesse",
            "Light",
            "Special",
            "Thrown (20/60)"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Man Catcher",
        "Cost": "25 gp",
        "Damage": "1d4 bludgeoning",
        "Weight": "2 lb",
        "Properties": [
        	"Reach", 
        	"Two-Handed",
        	"Special"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Maul",
        "Cost": "10 gp",
        "Damage": "2d6 bludgeoning",
        "Weight": "10 lb",
        "Properties": [
            "Heavy",
            "Two-Handed"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Meteor Hammer",
        "Cost": "30 gp",
        "Damage": "1d6 bludgeoning",
        "Weight": "5 lb",
        "Properties": [
        	"Special", 
        	"Two-Handed"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Monk's Spade",
        "Cost": "10 gp",
        "Damage": "1d6 slashing",
        "Weight": "4 lb",
        "Properties": [
        	"Reach", 
        	"Versatile (1d8)"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Morningstar",
        "Cost": "15 gp",
        "Damage": "1d8 piercing",
        "Weight": "4 lb",
        "Properties": [],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Parrying Dagger",
        "Cost": "5 gp",
        "Damage": "1d4 piercing",
        "Weight": "2 lb",
        "Properties": [
        	"Light", 
        	"Special"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Pike",
        "Cost": "5 gp",
        "Damage": "1d10 piercing",
        "Weight": "18 lb",
        "Properties": [
            "Heavy",
            "Reach",
            "Two-Handed"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Rapier",
        "Cost": "25 gp",
        "Damage": "1d8 piercing",
        "Weight": "2 lb",
        "Properties": [
            "Finesse"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Pollaxe",
        "Cost": "20 gp",
        "Damage": "2d4 bludgeoning",
        "Weight": "6 lb",
        "Properties": [
        	"Heavy", 
        	"Reach",
        	"Two-Handed"        	
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Saber",
        "Cost": "35 gp",
        "Damage": "1d8 slashing",
        "Weight": "3 lb",
        "Properties": [
        	"Light", 
        	"Finesse"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Scimitar",
        "Cost": "25 gp",
        "Damage": "1d6 slashing",
        "Weight": "3 lb",
        "Properties": [
            "Light", 
            "Finesse"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Shortsword",
        "Cost": "10 gp",
        "Damage": "1d6 piercing",
        "Weight": "2 lb",
        "Properties": [
            "Light", 
            "Finesse"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Side Sword",
        "Cost": "25 gp",
        "Damage": "1d6 piercing",
        "Weight": "2.5 lb",
        "Properties": [
        	"Light", 
        	"Special"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Small Sword",
        "Cost": "10 gp",
        "Damage": "1d6 piercing",
        "Weight": "1.5 lb",
        "Properties": [
        	"Light", 
        	"Finesse"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Sword Breaker",
        "Cost": "15 gp",
        "Damage": "1d4 slashing",
        "Weight": "2 lb",
        "Properties": [
        	"Light", 
        	"Special"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Talwar",
        "Cost": "30 gp",
        "Damage": "1d8 slashing",
        "Weight": "3 lb",
        "Properties": [
        	"Finesse"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Trident",
        "Cost": "5 gp",
        "Damage": "1d6 piercing",
        "Weight": "4 lb",
        "Properties": [
            "Thrown (20/60)", 
            "Versatile (1d8)"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Two-Handed Morningstar",
        "Cost": "25 gp",
        "Damage": "1d12 piercing",
        "Weight": "10 lb",
        "Properties": [
        	"Heavy", 
        	"Two-Handed"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "War Pick",
        "Cost": "5 gp",
        "Damage": "1d8 piercing",
        "Weight": "2 lb",
        "Properties": [],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "War Hammer",
        "Cost": "15 gp",
        "Damage": "1d8 bludgeoning",
        "Weight": "2 lb",
        "Properties": [
            "Versatile (1d10)"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Warcleaver",
        "Cost": "25 gp",
        "Damage": "1d8 slashing/bludgeoning",
        "Weight": "5 lb",
        "Properties": [],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Whip",
        "Cost": "2 gp",
        "Damage": "1d4 slashing",
        "Weight": "3 lb",
        "Properties": [
            "Reach", 
            "Finesse"
        ],
        type: weaponTypes.MartialMelee
    },
    {
        "Name": "Zweihänder",
        "Cost": "100 gp",
        "Damage": "2d8 slashing",
        "Weight": "9 lb",
        "Properties": [
        	"Heavy",
        	"Reach",
        	"Special", 
        	"Two-Handed"
        ],
        type: weaponTypes.MartialMelee
    },
	{
        "Name": "Blunderbuss",
        "Cost": "250 gp",
        "Damage": "2d6 piercing",
        "Weight": "5 lb",
        "Properties": [
        	"Ammunition",
        	"Range (20/60)",
        	"Loading",
        	"Two-Handed"
        ],
        type: weaponTypes.Firearms
    },
    {
        "Name": "Dragon",
        "Cost": "200 gp",
        "Damage": "1d4 piercing",
        "Weight": "3 lb",
        "Properties": [
        	"Ammunition",
        	"Range (20/60)",
        	"Loading"
        ],
        type: weaponTypes.Firearms
    },
    {
        "Name": "Pistol Sword",
        "Cost": "275 gp",
        "Damage": "1d6",
        "Weight": "5 lb",
        "Properties": [],
        type: weaponTypes.Firearms
    },
    {
        "Name": "Small Pistol",
        "Cost": "150 gp",
        "Damage": "1d6 piercing",
        "Weight": "5 lb",
        "Properties": [
        	"Ammunition",
        	"Range (20/160)",
        	"Loading",
        	"Light"
        ],
        type: weaponTypes.Firearms
    },
    {
        "Name": "Shot (20) (Ammunition)",
        "Cost": "6 gp",
        "Damage": "",
        "Weight": "4 lb",
        "Properties": [],
        type: weaponTypes.Firearms
    },
]