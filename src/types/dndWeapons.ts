import { damageTypes } from "./dndTypes";

export enum weaponTypes {
    SIMPLE_MELEE = "Simple Melee",
    SIMPLE_RANGED = "Simple Ranged",
    MARTIAL_MELEE = "Martial Melee",
    MARTIAL_RANGED = "Martial Ranged",
    FIREARMS = "Firearms",
}

export type weapon = {
    Name: string,
    Cost: string,
    Damage: string,
    DamageType: damageTypes,
    Weight: string,
    Properties: string[],
    type: weaponTypes,
    Homebrew?: boolean,
}

export const weapons = [
    {
        "Name": "Crossbow, light",
        "Cost": "25 gp",
        "Damage": "1d8",
        DamageType: damageTypes.PIERCING,
        "Weight": "5 lb",
        "Properties": [
            "Ammunition (80/320)",
            "Loading",
            "Two-Handed"
        ],
        type: weaponTypes.SIMPLE_RANGED
    },
    {
        "Name": "Dart",
        "Cost": "5 cp",
        "Damage": "1d4",
        DamageType: damageTypes.PIERCING,
        "Weight": "0.25 lb",
        "Properties": [
            "Finesse",
            "Thrown (20/60)"
        ],
        type: weaponTypes.SIMPLE_RANGED
    },
    {
        "Name": "Shortbow",
        "Cost": "25 gp",
        "Damage": "1d6",
        DamageType: damageTypes.PIERCING,
        "Weight": "2 lb",
        "Properties": [
            "Ammunition (80/320)",
            "Two-handed"
        ],
        type: weaponTypes.SIMPLE_RANGED
    },
    {
        "Name": "Sling",
        "Cost": "1 sp",
        "Damage": "1d4",
        DamageType: damageTypes.BLUDGEONING,
        "Weight": "",
        "Properties": [
            "Ammunition (30/120)"
        ],
        type: weaponTypes.SIMPLE_RANGED
    },
	{
        "Name": "Slingstaff",
        "Cost": "2 sp",
        "Damage": "1d6",
        DamageType: damageTypes.BLUDGEONING,
        "Weight": "2 lb",
        "Properties": [
            "Ammunition (30/120)",
            "Two-handed"
        ],
        type: weaponTypes.SIMPLE_RANGED
    },

    {
        "Name": "Barbed Dagger",
        "Cost": "10 gp",
        "Damage": "2d4",
        DamageType: damageTypes.PIERCING,
        "Weight": "1 lb",
        "Homebrew": "True",
        "Properties": [
            "Light", 
            "Finesse", 
            "Thrown (20/60)"
        ],
        type: weaponTypes.SIMPLE_MELEE,
    },
    {
        "Name": "Brandistock",
        "Cost": "10 gp",
        "Damage": "1d8",
        DamageType: damageTypes.PIERCING,
        "Weight": "4 lb",
        "Homebrew": "True",
        "Properties": [
            "Special",
            "Two-handed"
        ],
        type: weaponTypes.SIMPLE_MELEE
    },
    {
        "Name": "Broken Sword",
        "Cost": "5 sp",
        "Damage": "1d4",
        DamageType: damageTypes.PIERCING,
        "Weight": "1 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Light", 
            "Finesse"
        ],
        type: weaponTypes.SIMPLE_MELEE
    },
    {
        "Name": "Cestus",
        "Cost": "5 sp",
        "Damage": "1d4",
        DamageType: damageTypes.BLUDGEONING,
        "Weight": "0.5 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Light", 
            "Special"
        ],
        type: weaponTypes.SIMPLE_MELEE
    },
    {
        "Name": "Club",
        "Cost": "1 sp",
        "Damage": "1d4",
        DamageType: damageTypes.BLUDGEONING,
        "Weight": "2 lb",
        "Homebrew": "False",
        "Properties": [ 
            "Light"
        ],
        type: weaponTypes.SIMPLE_MELEE
    },
    {
        "Name": "Dagger",
        "Cost": "2 gp",
        "Damage": "1d4",
        DamageType: damageTypes.PIERCING,
        "Weight": "1 lb",
        "Homebrew": "False",
        "Properties": [ 
            "Light", 
            "Finesse",
            "Thrown (20/60)"
        ],
        type: weaponTypes.SIMPLE_MELEE
    },
    {
        "Name": "Double Spear",
        "Cost": "5 gp",
        "Damage": "1d6",
        DamageType: damageTypes.PIERCING,
        "Weight": "4 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Versatile (1d8)", 
            "Thrown (20/60)"
        ],
        type: weaponTypes.SIMPLE_MELEE
    },
    {
        "Name": "Eye Sickle",
        "Cost": "10 gp",
        "Damage": "1d6",
        DamageType: damageTypes.PIERCING,
        "Weight": "4 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Light", 
            "Finesse"
        ],
        type: weaponTypes.SIMPLE_MELEE
    },
    {
        "Name": "Falx",
        "Cost": "8 gp",
        "Damage": "1d6",
        DamageType: damageTypes.SLASHING,
        "Weight": "3 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Versatile (1d8)"
        ],
        type: weaponTypes.SIMPLE_MELEE
    },
    {
        "Name": "Fauchard",
        "Cost": "10 gp",
        "Damage": "1d6",
        DamageType: damageTypes.SLASHING,
        "Weight": "7 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Heavy", 
            "reach",
            "Two-handed"
        ],
        type: weaponTypes.SIMPLE_MELEE
    },
    {
        "Name": "Flamberge",
        "Cost": "15 gp",
        "Damage": "1d8 + 1d2",
        DamageType: damageTypes.SLASHING,
        "Weight": "6 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Ripping", 
            "Two-handed"
        ],
        type: weaponTypes.SIMPLE_MELEE
    },
    {
        "Name": "Gavel",
        "Cost": "5 sp",
        "Damage": "1d4",
        DamageType: damageTypes.BLUDGEONING,
        "Weight": "0.5 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Undersized"
        ],
        type: weaponTypes.SIMPLE_MELEE
    },
    {
        "Name": "Greatclub",
        "Cost": "2 sp",
        "Damage": "1d8",
        DamageType: damageTypes.BLUDGEONING,
        "Weight": "10 lb",
        "Homebrew": "False",
        "Properties": [ 
            "Two-handed"
        ],
        type: weaponTypes.SIMPLE_MELEE
    },
    {
        "Name": "Greatspear",
        "Cost": "25 gp",
        "Damage": "1d10",
        DamageType: damageTypes.PIERCING,
        "Weight": "8 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Oversized",
            "Thrown (20/60)", 
            "Two-handed"
        ],
        type: weaponTypes.SIMPLE_MELEE
    },
    {
        "Name": "Handaxe",
        "Cost": "5 gp",
        "Damage": "1d6",
        DamageType: damageTypes.SLASHING,
        "Weight": "2 lb",
        "Homebrew": "False",
        "Properties": [ 
            "Light", 
            "Thrown (20/60)" 
        ],
        type: weaponTypes.SIMPLE_MELEE
    },
    {
        "Name": "Iron Claws",
        "Cost": "5 gp",
        "Damage": "1d4",
        DamageType: damageTypes.PIERCING,
        "Weight": "2 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Light", 
            "Finesse"
        ],
        type: weaponTypes.SIMPLE_MELEE
    },
    {
        "Name": "Javelin",
        "Cost": "5 sp",
        "Damage": "1d6",
        DamageType: damageTypes.PIERCING,
        "Weight": "2 lb",
        "Homebrew": "False",
        "Properties": [ 
            "Thrown (30/120)"
        ],
        type: weaponTypes.SIMPLE_MELEE
    },
    {
        "Name": "Karambit",
        "Cost": "4 gp",
        "Damage": "1d4",
        DamageType: damageTypes.SLASHING,
        "Weight": "1 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Light", 
            "Finesse"
        ],
        type: weaponTypes.SIMPLE_MELEE
    },
    {
        "Name": "Katar",
        "Cost": "5 gp",
        "Damage": "1d4",
        DamageType: damageTypes.PIERCING,
        "Weight": "1 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Light", 
            "Finesse"
        ],
        type: weaponTypes.SIMPLE_MELEE
    },
    {
        "Name": "Knife",
        "Cost": "2 sp",
        "Damage": "1d3",
        DamageType: damageTypes.SLASHING,
        "Weight": "0.25 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Undersized", 
            "Finesse"
        ],
        type: weaponTypes.SIMPLE_MELEE
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
        type: weaponTypes.SIMPLE_MELEE
    },
    {
        "Name": "Ko",
        "Cost": "1 gp",
        "Damage": "1d4",
        "Damagetype": "Piercing /",
        DamageType: damageTypes.BLUDGEONING,
        "Weight": "1 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Light", 
            "Finesse",
            "Special"
        ],
        type: weaponTypes.SIMPLE_MELEE
    },
    {
        "Name": "Kukri",
        "Cost": "6 gp",
        "Damage": "1d6",
        DamageType: damageTypes.SLASHING,
        "Weight": "2 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Light", 
            "Thrown (20/60)"
        ],
        type: weaponTypes.SIMPLE_MELEE
    },
    {
        "Name": "Light Hammer",
        "Cost": "2 gp",
        "Damage": "1d4",
        DamageType: damageTypes.BLUDGEONING,
        "Weight": "2 lb",
        "Homebrew": "False",
        "Properties": [ 
            "Light",
            "Thrown (20/60)"
        ],
        type: weaponTypes.SIMPLE_MELEE
    },
    {
        "Name": "Mace",
        "Cost": "5 gp",
        "Damage": "1d6",
        DamageType: damageTypes.BLUDGEONING,
        "Weight": "2 lb",
        "Homebrew": "False",
        "Properties": [],
        type: weaponTypes.SIMPLE_MELEE
    },
    {
        "Name": "Needle",
        "Cost": "2 sp",
        "Damage": "1d4",
        DamageType: damageTypes.PIERCING,
        "Weight": "0.25 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Undersized", 
            "Finesse"
        ],
        type: weaponTypes.SIMPLE_MELEE
    },
    {
        "Name": "Quarterstaff",
        "Cost": "2 sp",
        "Damage": "1d6",
        DamageType: damageTypes.BLUDGEONING,
        "Weight": "4 lb",
        "Homebrew": "False",
        "Properties": [ 
            "Versatile (1d8)"
        ],
        type: weaponTypes.SIMPLE_MELEE
    },
    {
        "Name": "Sap",
        "Cost": "1 gp",
        "Damage": "1d4",
        DamageType: damageTypes.BLUDGEONING,
        "Weight": "2 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Light", 
            "Finesse"
        ],
        type: weaponTypes.SIMPLE_MELEE
    },
    {
        "Name": "Scythe",
        "Cost": "5 gp",
        "Damage": "2d4",
        DamageType: damageTypes.SLASHING,
        "Weight": "5 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Heavy", 
            "Two-handed"
        ],
        type: weaponTypes.SIMPLE_MELEE
    },
    {
        "Name": "Sickle",
        "Cost": "1 gp",
        "Damage": "1d4",
        DamageType: damageTypes.SLASHING,
        "Weight": "2 lb",
        "Homebrew": "False",
        "Properties": [ 
            "Light"
        ],
        type: weaponTypes.SIMPLE_MELEE
    },
    {
        "Name": "Spade",
        "Cost": "2 gp",
        "Damage": "1d4",
        DamageType: damageTypes.BLUDGEONING,
        "Weight": "4 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Versatile" 
        ],
        type: weaponTypes.SIMPLE_MELEE
    },
    {
        "Name": "Spear",
        "Cost": "1 gp",
        "Damage": "1d4",
        DamageType: damageTypes.SLASHING,
        "Weight": "3 lb",
        "Homebrew": "False",
        "Properties": [ 
            "Thrown (20/60)",
            "Versatile (1d8)"
        ],
        type: weaponTypes.SIMPLE_MELEE
    },
    {
        "Name": "Torch Mace",
        "Cost": "6 gp",
        "Damage": "1d4",
        DamageType: damageTypes.BLUDGEONING,
        "Weight": "2 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Special"
        ],
        type: weaponTypes.SIMPLE_MELEE
    },
    {
        "Name": "Torch Staff",
        "Cost": "12 gp",
        "Damage": "2d4",
        DamageType: damageTypes.BLUDGEONING,
        "Weight": "7 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Heavy", 
            "Two-handed",
            "Special"
        ],
        type: weaponTypes.SIMPLE_MELEE
    },
    {
        "Name": "Zerka",
        "Cost": "10 sp",
        "Damage": "1d8",
        DamageType: damageTypes.PIERCING,
        "Weight": "3 lb",
        "Homebrew": "True",
        "Properties": [ 
            "Special", 
            "Finesse",
            "Thrown (40/160)"
        ],
        type: weaponTypes.SIMPLE_MELEE
    },
	{
        "Name": "Atlatl",
        "Cost": "5 gp",
        "Damage": "1d6",
        DamageType: damageTypes.PIERCING,
        "Weight": "1 lb",
        "Properties": [
        	"Ammunition",
        	"Range (50-100)",
        	"Special"
        ],
        type: weaponTypes.MARTIAL_RANGED
    },
    {
        "Name": "Blowgun",
        "Cost": "10 gp",
        "Damage": "1",
        DamageType: damageTypes.PIERCING,
        "Weight": "1 lb",
        "Properties": [
        	"Ammunition",
        	"Range (25/100)",
        	"Loading"
        ],
        type: weaponTypes.MARTIAL_RANGED
    },	
    {
        "Name": "Bolas",
        "Cost": "1 gp",
        "Damage": "1d4",
        DamageType: damageTypes.BLUDGEONING,
        "Weight": "2 lb",
        "Properties": [
        	"Special",
        	"Thrown (20/60)"
        ],
        type: weaponTypes.MARTIAL_RANGED
    },
    {
        "Name": "Boomerang",
        "Cost": "2 gp",
        "Damage": "1d4",
        DamageType: damageTypes.BLUDGEONING,
        "Weight": "1 lb",
        "Properties": [
        	"Special",
        	"Thrown (20/60)"
        ],
        type: weaponTypes.MARTIAL_RANGED
    },			
    {
        "Name": "Chakram",
        "Cost": "5 gp",
        "Damage": "1d6",
        DamageType: damageTypes.SLASHING,
        "Weight": "0.5 lb",
        "Properties": [
        	"Finesse",
        	"Thrown (20/60)"
        ],
        type: weaponTypes.MARTIAL_RANGED
    },
    {
        "Name": "Chatkcha",
        "Cost": "1 gp",
        "Damage": "1d6",
        DamageType: damageTypes.SLASHING,
        "Weight": "2 lb",
        "Properties": [
        	"Finesse",
        	"Light",
        	"Thrown (30/120)",
        	"Special"
        ],
        type: weaponTypes.MARTIAL_RANGED
    },	
    {
        "Name": "Crossbow, Hand",
        "Cost": "75 gp",
        "Damage": "1d6",
        DamageType: damageTypes.PIERCING,
        "Weight": "3 lb",
        "Properties": [
        	"Ammunition",
        	"Range (30/120)",
        	"Light",
        	"Loading"
        ],
        type: weaponTypes.MARTIAL_RANGED
    },	
    {
        "Name": "Crossbow, Heavy",
        "Cost": "50 gp",
        "Damage": "1d10",
        DamageType: damageTypes.PIERCING,
        "Weight": "18 lb",
        "Properties": [
        	"Ammunition",
        	"Range (100/400)",
        	"Heavy",
        	"Loading",
        	"Two-Handed"
        ],
        type: weaponTypes.MARTIAL_RANGED
    },	
    {
        "Name": "Crossbow, Repeating",
        "Cost": "250 gp",
        "Damage": "2d4",
        DamageType: damageTypes.PIERCING,
        "Weight": "18 lb",
        "Properties": [
        	"Ammunition",
        	"Range (80/320)",
        	"Heavy",
        	"Two-Handed"
        ],
        type: weaponTypes.MARTIAL_RANGED
    },	
    {
        "Name": "Longbow",
        "Cost": "50 gp",
        "Damage": "1d8",
        DamageType: damageTypes.PIERCING,
        "Weight": "2 lb",
        "Properties": [
        	"Ammunition",
        	"Range (150/600)",
        	"Heavy",
        	"Two-Handed"
        ],
        type: weaponTypes.MARTIAL_RANGED
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
        type: weaponTypes.MARTIAL_RANGED
    },	
    {
        "Name": "Throwing Hammer",
        "Cost": "15 gp",
        "Damage": "1d6",
        DamageType: damageTypes.BLUDGEONING,
        "Weight": "4 lb",
        "Properties": [
        	"Thrown (60/120)"
        ],
        type: weaponTypes.MARTIAL_RANGED
    },
	{
        "Name": "Arming Sword",
        "Cost": "20 gp",
        "Damage": "1d6",
        DamageType: damageTypes.PIERCING,
        "Weight": "3 lb",
        "Properties": [
        	"Light", 
        	"Finesse", 
        	"Versatile (1d8)"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Back Sword",
        "Cost": "10 gp",
        "Damage": "1d6",
        DamageType: damageTypes.PIERCING,
        "Weight": "3 lb",
        "Properties": [],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Battleaxe",
        "Cost": "10 gp",
        "Damage": "1d8",
        DamageType: damageTypes.SLASHING,
        "Weight": "4 lb",
        "Properties": [
        	"Versatile (1d10)"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Bec de Corbin",
        "Cost": "20 gp",
        "Damage": "2d4",
        DamageType: damageTypes.PIERCING,
        "Weight": "6 lb",
        "Properties": [
        	"Heavy", 
        	"Reach", 
        	"Two-Handed"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Boar Spear",
        "Cost": "10 gp",
        "Damage": "2d6",
        DamageType: damageTypes.PIERCING,
        "Weight": "5 lb",
        "Properties": [
        	"Heavy", 
        	"Two-Handed"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Broadsword",
        "Cost": "20 gp",
        "Damage": "2d4",
        DamageType: damageTypes.PIERCING,
        "Weight": "3 lb",
        "Properties": [],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Buster Sword",
        "Cost": "250 gp",
        "Damage": "2d8",
        DamageType: damageTypes.SLASHING,
        "Weight": "12 lb",
        "Properties": [
        	"Oversized", 
        	"Two-Handed"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Chaind, Bladed",
        "Cost": "8 gp",
        "Damage": "1d6",
        DamageType: damageTypes.SLASHING,
        "Weight": "10 lb",
        "Properties": [
        	"Heavy", 
        	"Finesse",
        	"Reach", 
        	"Special",
        	"Two-Handed"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Chaind, Spiked",
        "Cost": "8 gp",
        "Damage": "1d6",
        DamageType: damageTypes.PIERCING,
        "Weight": "10 lb",
        "Properties": [
        	"Heavy", 
        	"Finesse",
        	"Reach", 
        	"Special",
        	"Two-Handed"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Chaind, Weighted",
        "Cost": "8 gp",
        "Damage": "1d6",
        DamageType: damageTypes.BLUDGEONING,
        "Weight": "10 lb",
        "Properties": [
        	"Heavy", 
        	"Finesse",
        	"Reach", 
        	"Special",
        	"Two-Handed"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Cutlass",
        "Cost": "10 gp",
        "Damage": "1d8",
        DamageType: damageTypes.SLASHING,
        "Weight": "2 lb",
        "Properties": [
        	"Light"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Double Axe",
        "Cost": "30 gp",
        "Damage": "1d8",
        DamageType: damageTypes.SLASHING,
        "Weight": "10 lb",
        "Properties": [
        	"Heavy", 
        	"Two-Handed",
        	"Double Weapon"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Double Flail",
        "Cost": "20 gp",
        "Damage": "1d8",
        DamageType: damageTypes.BLUDGEONING,
        "Weight": "4 lb",
        "Properties": [ 
        	"Two-Handed"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Double Sword",
        "Cost": "20 gp",
        "Damage": "1d6",
        DamageType: damageTypes.SLASHING,
        "Weight": "5 lb",
        "Properties": [
        	"Double Weapon", 
        	"Two-Handed"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Dueling Shield",
        "Cost": "15 gp",
        "Damage": "1d8",
        DamageType: damageTypes.BLUDGEONING,
        "Weight": "10 lb",
        "Properties": [
        	"Heavy", 
        	"Special",
        	"Two-Handed"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Dwarven Ugrosh",
        "Cost": "50 gp",
        "Damage": "1d10",
        DamageType: damageTypes.SLASHING,
        "Weight": "9 lb",
        "Properties": [
        	"Heavy", 
        	"Two-Handed"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Elven Lightblade",
        "Cost": "50 gp",
        "Damage": "1d6",
        DamageType: damageTypes.PIERCING,
        "Weight": "1 lb",
        "Properties": [
        	"Finesse", 
        	"Light",
        	"Special"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Elven Thinblade",
        "Cost": "100 gp",
        "Damage": "1d8",
        DamageType: damageTypes.PIERCING,
        "Weight": "1 lb",
        "Properties": [
        	"Finesse", 
        	"Special"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Epee",
        "Cost": "50 gp",
        "Damage": "1d2",
        DamageType: damageTypes.PIERCING,
        "Weight": "1 lb",
        "Properties": [
        	"Special", 
        	"Finesse"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Estoc",
        "Cost": "25 gp",
        "Damage": "1d8",
        DamageType: damageTypes.PIERCING,
        "Weight": "3 lb",
        "Properties": [
        	"Versatile (1d10)"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Faeblades",
        "Cost": "50 gp",
        "Damage": "2d4",
        DamageType: damageTypes.SLASHING,
        "Weight": "2.5 lb",
        "Properties": [
        	"Light", 
        	"Finesse",
        	"Special"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Falchion",
        "Cost": "10 gp",
        "Damage": "1d8",
        DamageType: damageTypes.SLASHING,
        "Weight": "3 lb",
        "Properties": [],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Flail",
        "Cost": "10 gp",
        "Damage": "1d8",
        DamageType: damageTypes.BLUDGEONING,
        "Weight": "2 lb",
        "Properties": [],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Glaive",
        "Cost": "20 gp",
        "Damage": "1d10",
        DamageType: damageTypes.SLASHING,
        "Weight": "6 lb",
        "Properties": [
            "Heavy",
            "Reach",
            "Two-Handed"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Greataxe",
        "Cost": "30 gp",
        "Damage": "1d12",
        DamageType: damageTypes.SLASHING,
        "Weight": "7 lb",
        "Properties": [
            "Heavy",
            "Two-Handed"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Great Maul",
        "Cost": "150 gp",
        "Damage": "3d6",
        DamageType: damageTypes.BLUDGEONING,
        "Weight": "145 lb",
        "Properties": [
        	"Oversized", 
        	"Two-Handed",
        	"Special"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Greatsword",
        "Cost": "50 gp",
        "Damage": "2d6",
        DamageType: damageTypes.SLASHING,
        "Weight": "6 lb",
        "Properties": [
            "Heavy",
            "Two-Handed"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Guisarme",
        "Cost": "15 gp",
        "Damage": "2d4",
        DamageType: damageTypes.SLASHING,
        "Weight": "6 lb",
        "Properties": [
        	"Heavy", 
        	"Reach",
        	"Two-Handed"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Gythka",
        "Cost": "20 gp",
        "Damage": "1d8",
        DamageType: damageTypes.SLASHING,
        "Weight": "9 lb",
        "Properties": [
        	"Heavy", 
        	"Two-Handed"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Halberd",
        "Cost": "20 gp",
        "Damage": "1d10",
        DamageType: damageTypes.SLASHING,
        "Weight": "6 lb",
        "Properties": [
            "Heavy",
            "Reach",
            "Two-Handed"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Heavy Flail",
        "Cost": "20 gp",
        "Damage": "1d12",
        DamageType: damageTypes.BLUDGEONING,
        "Weight": "7 lb",
        "Properties": [
        	"Heavy", 
        	"Two-Handed"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Hidden Blade",
        "Cost": "100 gp",
        "Damage": "1d4",
        DamageType: damageTypes.PIERCING,
        "Weight": "0.5 lb",
        "Properties": [
        	"Light", 
        	"Finesse",
        	"Special"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Katana",
        "Cost": "50 gp",
        "Damage": "1d8",
        DamageType: damageTypes.SLASHING,
        "Weight": "3 lb",
        "Properties": [
        	"Versatile (1d10)"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Lajav",
        "Cost": "30 gp",
        "Damage": "1d8",
        DamageType: damageTypes.BLUDGEONING,
        "Weight": "5 lb",
        "Properties": [
        	"Finesse",
        	"Heavy", 
        	"Two-Handed",
        	"Special"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Lance",
        "Cost": "10 gp",
        "Damage": "1d12",
        DamageType: damageTypes.PIERCING,
        "Weight": "6 lb",
        "Properties": [
            "Reach",
            "Special"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Longspear",
        "Cost": "3 gp",
        "Damage": "1d6",
        DamageType: damageTypes.PIERCING,
        "Weight": "4 lb",
        "Properties": [
        	"Heavy", 
        	"Reach",
        	"Versatile (1d8)"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Longstaff",
        "Cost": "5 sp",
        "Damage": "1d8",
        DamageType: damageTypes.BLUDGEONING,
        "Weight": "7 lb",
        "Properties": [
        	"Heavy", 
        	"Reach",
        	"Special",
        	"Two-Handed"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Longsword",
        "Cost": "15 gp",
        "Damage": "1d8",
        DamageType: damageTypes.SLASHING,
        "Weight": "3 lb",
        "Properties": [
            "Versatile (1d10)"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Main Gauche",
        "Cost": "5 gp",
        "Damage": "1d4",
        DamageType: damageTypes.PIERCING,
        "Weight": "1 lb",
        "Properties": [
            "Finesse",
            "Light",
            "Special",
            "Thrown (20/60)"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Man Catcher",
        "Cost": "25 gp",
        "Damage": "1d4",
        DamageType: damageTypes.BLUDGEONING,
        "Weight": "2 lb",
        "Properties": [
        	"Reach", 
        	"Two-Handed",
        	"Special"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Maul",
        "Cost": "10 gp",
        "Damage": "2d6",
        DamageType: damageTypes.BLUDGEONING,
        "Weight": "10 lb",
        "Properties": [
            "Heavy",
            "Two-Handed"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Meteor Hammer",
        "Cost": "30 gp",
        "Damage": "1d6",
        DamageType: damageTypes.BLUDGEONING,
        "Weight": "5 lb",
        "Properties": [
        	"Special", 
        	"Two-Handed"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Monk's Spade",
        "Cost": "10 gp",
        "Damage": "1d6",
        DamageType: damageTypes.SLASHING,
        "Weight": "4 lb",
        "Properties": [
        	"Reach", 
        	"Versatile (1d8)"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Morningstar",
        "Cost": "15 gp",
        "Damage": "1d8",
        DamageType: damageTypes.PIERCING,
        "Weight": "4 lb",
        "Properties": [],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Parrying Dagger",
        "Cost": "5 gp",
        "Damage": "1d4",
        DamageType: damageTypes.PIERCING,
        "Weight": "2 lb",
        "Properties": [
        	"Light", 
        	"Special"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Pike",
        "Cost": "5 gp",
        "Damage": "1d10",
        DamageType: damageTypes.PIERCING,
        "Weight": "18 lb",
        "Properties": [
            "Heavy",
            "Reach",
            "Two-Handed"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Rapier",
        "Cost": "25 gp",
        "Damage": "1d8",
        DamageType: damageTypes.PIERCING,
        "Weight": "2 lb",
        "Properties": [
            "Finesse"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Pollaxe",
        "Cost": "20 gp",
        "Damage": "2d4",
        DamageType: damageTypes.BLUDGEONING,
        "Weight": "6 lb",
        "Properties": [
        	"Heavy", 
        	"Reach",
        	"Two-Handed"        	
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Saber",
        "Cost": "35 gp",
        "Damage": "1d8",
        DamageType: damageTypes.SLASHING,
        "Weight": "3 lb",
        "Properties": [
        	"Light", 
        	"Finesse"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Scimitar",
        "Cost": "25 gp",
        "Damage": "1d6",
        DamageType: damageTypes.SLASHING,
        "Weight": "3 lb",
        "Properties": [
            "Light", 
            "Finesse"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Shortsword",
        "Cost": "10 gp",
        "Damage": "1d6",
        DamageType: damageTypes.PIERCING,
        "Weight": "2 lb",
        "Properties": [
            "Light", 
            "Finesse"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Side Sword",
        "Cost": "25 gp",
        "Damage": "1d6",
        DamageType: damageTypes.PIERCING,
        "Weight": "2.5 lb",
        "Properties": [
        	"Light", 
        	"Special"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Small Sword",
        "Cost": "10 gp",
        "Damage": "1d6",
        DamageType: damageTypes.PIERCING,
        "Weight": "1.5 lb",
        "Properties": [
        	"Light", 
        	"Finesse"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Sword Breaker",
        "Cost": "15 gp",
        "Damage": "1d4",
        DamageType: damageTypes.SLASHING,
        "Weight": "2 lb",
        "Properties": [
        	"Light", 
        	"Special"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Talwar",
        "Cost": "30 gp",
        "Damage": "1d8",
        DamageType: damageTypes.SLASHING,
        "Weight": "3 lb",
        "Properties": [
        	"Finesse"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Trident",
        "Cost": "5 gp",
        "Damage": "1d6",
        DamageType: damageTypes.PIERCING,
        "Weight": "4 lb",
        "Properties": [
            "Thrown (20/60)", 
            "Versatile (1d8)"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Two-Handed Morningstar",
        "Cost": "25 gp",
        "Damage": "1d12",
        DamageType: damageTypes.PIERCING,
        "Weight": "10 lb",
        "Properties": [
        	"Heavy", 
        	"Two-Handed"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "War Pick",
        "Cost": "5 gp",
        "Damage": "1d8",
        DamageType: damageTypes.PIERCING,
        "Weight": "2 lb",
        "Properties": [],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "War Hammer",
        "Cost": "15 gp",
        "Damage": "1d8",
        DamageType: damageTypes.BLUDGEONING,
        "Weight": "2 lb",
        "Properties": [
            "Versatile (1d10)"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Warcleaver",
        "Cost": "25 gp",
        "Damage": "1d8 slashing/bludgeoning",
        "Weight": "5 lb",
        "Properties": [],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Whip",
        "Cost": "2 gp",
        "Damage": "1d4",
        DamageType: damageTypes.SLASHING,
        "Weight": "3 lb",
        "Properties": [
            "Reach", 
            "Finesse"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
    {
        "Name": "Zweihänder",
        "Cost": "100 gp",
        "Damage": "2d8",
        DamageType: damageTypes.SLASHING,
        "Weight": "9 lb",
        "Properties": [
        	"Heavy",
        	"Reach",
        	"Special", 
        	"Two-Handed"
        ],
        type: weaponTypes.MARTIAL_MELEE
    },
	{
        "Name": "Blunderbuss",
        "Cost": "250 gp",
        "Damage": "2d6",
        DamageType: damageTypes.PIERCING,
        "Weight": "5 lb",
        "Properties": [
        	"Ammunition",
        	"Range (20/60)",
        	"Loading",
        	"Two-Handed"
        ],
        type: weaponTypes.FIREARMS
    },
    {
        "Name": "Dragon",
        "Cost": "200 gp",
        "Damage": "1d4",
        DamageType: damageTypes.PIERCING,
        "Weight": "3 lb",
        "Properties": [
        	"Ammunition",
        	"Range (20/60)",
        	"Loading"
        ],
        type: weaponTypes.FIREARMS
    },
    {
        "Name": "Pistol Sword",
        "Cost": "275 gp",
        "Damage": "1d6",
        "Weight": "5 lb",
        "Properties": [],
        type: weaponTypes.FIREARMS
    },
    {
        "Name": "Small Pistol",
        "Cost": "150 gp",
        "Damage": "1d6",
        DamageType: damageTypes.PIERCING,
        "Weight": "5 lb",
        "Properties": [
        	"Ammunition",
        	"Range (20/160)",
        	"Loading",
        	"Light"
        ],
        type: weaponTypes.FIREARMS
    },
    {
        "Name": "Shot (20) (Ammunition)",
        "Cost": "6 gp",
        "Damage": "",
        "Weight": "4 lb",
        "Properties": [],
        type: weaponTypes.FIREARMS
    },
]