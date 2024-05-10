import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  IconButton,
  Input,
  Select,
  StackDivider,
  Textarea,
  VStack,
  Wrap,
  WrapItem,
  useToast,
} from "@chakra-ui/react";

import {
  Attack,
  damageTypes,
  damageTypeEmojis,
  conditions,
  stats,
  statEmojis,
  statColors,
  AttackType,
  SpellAttack,
  SpellSubType,
  AoEAttack,
  AoESubType,
  DamageEntry,
  MeleeAttack,
  RangedAttack,
} from "../types/dndTypes";
import DamageDiceComponent from "./DamageDiceComponent";
const AttackForm: React.FC = () => {
  const [attacks, setAttacks] = useState<Attack[]>([]);
  const [attackString, setAttackString] = useState<string>("");

  const addAttack = () => {
    const newAttack: MeleeAttack = {
      id: attacks.length + 1,
      name: "",
      type: AttackType.Melee,
      toHit: "7",
      reach: "5ft",
      hitDamage: "",
      damageType: damageTypes.SLASHING,
      description: "",
    };
    setAttacks([...attacks, newAttack]);
  };

  const handleInputChange = (id: number, field: string, value: any) => {
    setAttacks((attacks) =>
      attacks.map((attack) => {
        if (attack.id === id) {
          return { ...attack, [field]: value };
        }
        return attack;
      })
    );
  };

  const formatAttackDescription = (attack: Attack) => {
    let description;
    switch (attack.type) {
      case AttackType.Melee:
        const meleeAttack = attack as MeleeAttack;
        description = `${meleeAttack.name}. Melee Attack: [rollable]+${
          meleeAttack.toHit
        };{diceNotation:"1d20+${
          meleeAttack.toHit
        }",rollType:"to hit",rollAction:"${
          meleeAttack.name
        }"}[/rollable] to hit, reach ${meleeAttack.reach}. Hit: ${
          meleeAttack.hitDamage
        } [rollable]${meleeAttack.hitDamage}{diceNotation:"${
          meleeAttack.hitDamage
        }",rollType:"damage",rollAction:"${meleeAttack.name}",rollDamageType:"${
          damageTypes[meleeAttack.damageType as keyof typeof damageTypes]
        }"}[/rollable] ${
          damageTypes[meleeAttack.damageType as keyof typeof damageTypes]
        } damage.\n${meleeAttack.description}`;
        break;
      case AttackType.Ranged:
        const rangedAttack = attack as RangedAttack;
        description = `${rangedAttack.name}. Ranged Attack: [rollable]+${
          rangedAttack.toHit
        };{diceNotation:"1d20+${
          rangedAttack.toHit
        }",rollType:"to hit",rollAction:"${
          rangedAttack.name
        }"}[/rollable] to hit, range ${rangedAttack.shortRange}/${
          rangedAttack.longRange
        }. Hit: ${rangedAttack.hitDamage} [rollable]${
          rangedAttack.hitDamage
        }{diceNotation:"${
          rangedAttack.hitDamage
        }",rollType:"damage",rollAction:"${
          rangedAttack.name
        }",rollDamageType:"${
          damageTypes[rangedAttack.damageType as keyof typeof damageTypes]
        }"}[/rollable] ${
          damageTypes[rangedAttack.damageType as keyof typeof damageTypes]
        } damage.\n${rangedAttack.description}`;
        break;
      // case AttackType.Spell:
      //   description = `${attack.name}. ${attack.subType} Spell Attack: ${attack.effectDescription}. Spell Save DC: ${attack.spellSaveDC}, [rollable]{diceNotation:"${attack.hitDamage}",rollType:"damage",rollAction:"${attack.name}",rollDamageType:"${attack.damageType}"}[/rollable] ${attack.damageType} damage.`;
      //   break;
      // case AttackType.AoE:
      //   description = `${attack.name}. Area of Effect (${attack.subType}) Attack: ${attack.effectDescription}, range ${attack.range}. [rollable]{diceNotation:"${attack.hitDamage}",rollType:"damage",rollAction:"${attack.name}",rollDamageType:"${attack.damageType}"}[/rollable] ${attack.damageType} damage.`;
      //   break;
      // case AttackType.ConditionEffect:
      //   description = `${attack.name}. ${attack.subType} Condition Effect: ${attack.conditionDescription} when ${attack.effectTrigger === 'Hit' ? 'hit' : 'failing a save'}, DC ${attack.conditionSaveDC}. [rollable]{diceNotation:"${attack.hitDamage}",rollType:"damage",rollAction:"${attack.name}",rollDamageType:"${attack.damageType}"}[/rollable] ${attack.damageType} damage.`;
      //   break;
      // case AttackType.Utility:
      //   description = `${attack.name}. Utility: ${attack.utilityType}, ${attack.effectDescription}.`;
      //   break;
      default:
        description = `${attack.name}. ${attack.description}`;
        break;
    }
    return description;
  };

  const exportAttacks = () => {
    const formattedAttacks = attacks
      .map((attack) => formatAttackDescription(attack))
      .join("\n");
    setAttackString(formattedAttacks);
    return formattedAttacks;
  };

  const renderAttackFields = (attack: Attack) => {
    switch (attack.type) {
      case AttackType.Melee:
        const weaponAttack = attack as MeleeAttack;
        return (
          <VStack key={attack.id} width="100%">
            <FormControl>
              <FormLabel>To Hit Modifier</FormLabel>
              <Input
                value={weaponAttack.toHit}
                placeholder="5"
                onChange={(e) =>
                  handleInputChange(attack.id, "toHit", e.target.value)
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Reach</FormLabel>
              <Input
                value={weaponAttack.reach}
                defaultValue={"5ft"}
                onChange={(e) =>
                  handleInputChange(attack.id, "reach", e.target.value)
                }
              />
            </FormControl>
          </VStack>
        );
      case AttackType.Ranged:
        const rangedAttack = attack as RangedAttack;
        return (
          <VStack key={attack.id} width="100%">
            <FormControl>
              <FormLabel>To Hit Modifier</FormLabel>
              <Input
                value={rangedAttack.toHit}
                placeholder="5"
                onChange={(e) =>
                  handleInputChange(attack.id, "toHit", e.target.value)
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Ranges (ft)</FormLabel>
              <HStack>
                <Input
                  value={rangedAttack.shortRange}
                  placeholder="30"
                  onChange={(e) =>
                    handleInputChange(attack.id, "shortRange", e.target.value)
                  }
                />
                <Input
                  value={rangedAttack.longRange}
                  placeholder="120"
                  onChange={(e) =>
                    handleInputChange(attack.id, "longRange", e.target.value)
                  }
                />
              </HStack>
            </FormControl>
          </VStack>
        );

      // case AttackType.Spell:
      //   const spellAttack = attack as SpellAttack;
      //   return (
      //     <>
      //       <FormControl>
      //         <FormLabel>Sub-Type</FormLabel>
      //         <Select value={spellAttack.subType} onChange={(e) => handleInputChange(attack.id, 'subType', e.target.value)}>
      //           {Object.values(SpellSubType).map(subType => (
      //             <option key={subType} value={subType}>{subType}</option>
      //           ))}
      //         </Select>
      //       </FormControl>
      //       <FormControl>
      //         <FormLabel>Spell Save DC (if applicable)</FormLabel>
      //         <Input value={spellAttack.spellSaveDC || ''} placeholder="Only for Saving Throw Spells" onChange={(e) => handleInputChange(attack.id, 'spellSaveDC', e.target.value)} />
      //       </FormControl>
      //       <FormControl>
      //         <FormLabel>Effect Description</FormLabel>
      //         <Textarea value={spellAttack.effectDescription} onChange={(e) => handleInputChange(attack.id, 'effectDescription', e.target.value)} />
      //       </FormControl>
      //     </>
      //   );
      // case AttackType.AoE:
      //   const aoeAttack = attack as AoEAttack;
      //   return (
      //     <>
      //       <FormControl>
      //         <FormLabel>Sub-Type</FormLabel>
      //         <Select value={aoeAttack.subType} onChange={(e) => handleInputChange(attack.id, 'subType', e.target.value)}>
      //           {Object.values(AoESubType).map(subType => (
      //             <option key={subType} value={subType}>{subType}</option>
      //           ))}
      //         </Select>
      //       </FormControl>
      //       <FormControl>
      //         <FormLabel>Range/Area</FormLabel>
      //         <Input value={aoeAttack.range} onChange={(e) => handleInputChange(attack.id, 'range', e.target.value)} />
      //       </FormControl>
      //       <FormControl>
      //         <FormLabel>Effect Description</FormLabel>
      //         <Textarea value={aoeAttack.effectDescription} onChange={(e) => handleInputChange(attack.id, 'effectDescription', e.target.value)} />
      //       </FormControl>
      //     </>
      //   );
      // Implement cases for ConditionEffect and Utility as needed
      default:
        return null;
    }
  };

  return (
    <VStack padding="5" width="100%">
      {attacks.map((attack) => (
        <VStack
          key={attack.id}
          p={5}
          backgroundColor="blue.800"
          borderRadius="md"
          border="1px solid"
        >
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              value={attack.name}
              onChange={(e) =>
                handleInputChange(attack.id, "name", e.target.value)
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Hit Damage</FormLabel>
            <DamageDiceComponent
              initialDamageEntry={{
                dice: [
                  {
                    diceNumber: 1,
                    diceType: "d6",
                  },
                ],
                damageType: "SLASHING",
              }}
              onChange={(entry) => {
                handleInputChange(attack.id, "hitDamage", entry.dice);
                handleInputChange(attack.id, "damageType", entry.damageType);
              }}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Attack Type</FormLabel>
            <Select
              value={attack.type}
              onChange={(e) =>
                handleInputChange(
                  attack.id,
                  "type",
                  e.target.value as AttackType
                )
              }
            >
              {Object.values(AttackType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </FormControl>
          {renderAttackFields(attack)}
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={attack.description}
              onChange={(e) =>
                handleInputChange(attack.id, "description", e.target.value)
              }
            />
          </FormControl>
          <Button
            onClick={() =>
              setAttacks(attacks.filter((a) => a.id !== attack.id))
            }
            colorScheme="red"
            alignSelf="flex-end"
          >
            Remove
          </Button>
        </VStack>
      ))}
      <HStack paddingY={5}>
        <Button onClick={addAttack} colorScheme="green">
          Add Attack
        </Button>
        <Button colorScheme="blue" onClick={exportAttacks}>
          Export Attacks
        </Button>
      </HStack>
      <Textarea value={attackString} isReadOnly />
    </VStack>
  );
};

export default AttackForm;
