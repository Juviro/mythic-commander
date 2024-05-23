import { create } from 'zustand';

export type TargetType = 'player' | 'card';

export interface Attacker {
  id: string;
  targetType: TargetType;
  targetId: string;
  blockerIds: string[];
}

interface CombatStore {
  /**
   * The ids of the attackers that don't have a target yet.
   */
  selectedAttackerIds: string[];
  toggleSelectedAttackerId: (attackerId: string) => void;
  resetSelectedAttackerIds: () => void;

  attackers: Attacker[];
  attackTarget: (targetId: string, targetType: TargetType) => void;

  isDeclaringBlockers: boolean;
  setIsDeclaringBlockers: (isDeclaringBlockers: boolean) => void;
}

const useCombatStore = create<CombatStore>((set) => ({
  selectedAttackerIds: [],
  toggleSelectedAttackerId: (attackerId: string) =>
    set((state) => {
      if (state.selectedAttackerIds.includes(attackerId)) {
        return {
          selectedAttackerIds: state.selectedAttackerIds.filter(
            (id) => id !== attackerId
          ),
        };
      }
      return { selectedAttackerIds: [...state.selectedAttackerIds, attackerId] };
    }),
  resetSelectedAttackerIds: () => set({ selectedAttackerIds: [] }),

  attackers: [],
  attackTarget: (targetId: string, targetType: TargetType) =>
    set((state) => {
      const cardIds = state.selectedAttackerIds;
      const updatedAttackers = state.attackers.filter(
        (attacker) => !cardIds.includes(attacker.id)
      );
      const newAttackers = cardIds.map((id) => ({
        id,
        targetId,
        targetType,
        blockerIds: [],
      }));
      return {
        attackers: updatedAttackers.concat(newAttackers),
        selectedAttackerIds: [],
      };
    }),

  isDeclaringBlockers: false,
  setIsDeclaringBlockers: (isDeclaringBlockers: boolean) => set({ isDeclaringBlockers }),
}));

export default useCombatStore;
