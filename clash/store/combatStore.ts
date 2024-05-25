import { create } from 'zustand';

export type TargetType = 'player' | 'card';

interface TemporaryAttacker {
  id: string;
  targetType?: TargetType;
  targetId?: string;
  blockerIds: string[];
}

interface PermanentAttacker {
  id: string;
  targetType: TargetType;
  targetId: string;
  blockerIds: string[];
}

export type Attacker = TemporaryAttacker | PermanentAttacker;

interface CombatStore {
  toggleAttacker: (attackerId: string) => void;
  resetAttackers: () => void;

  attackers: Attacker[];
  attackTarget: (targetId: string, targetType: TargetType) => void;

  isDeclaringBlockers: boolean;
  setIsDeclaringBlockers: (isDeclaringBlockers: boolean) => void;
}

const useCombatStore = create<CombatStore>((set) => ({
  attackers: [],
  toggleAttacker: (attackerId: string) =>
    set((state) => {
      const filteredAttackers = state.attackers.filter(({ id }) => id !== attackerId);
      if (filteredAttackers.length < state.attackers.length) {
        return { attackers: filteredAttackers };
      }
      return { attackers: [...state.attackers, { id: attackerId, blockerIds: [] }] };
    }),
  resetAttackers: () => set({ attackers: [] }),
  attackTarget: (targetId: string, targetType: TargetType) =>
    set((state) => {
      const updatedAttackers = state.attackers.map((attacker) => {
        if (attacker.targetId) return attacker;
        return { ...attacker, targetId, targetType };
      });
      return {
        attackers: updatedAttackers,
      };
    }),

  isDeclaringBlockers: false,
  setIsDeclaringBlockers: (isDeclaringBlockers: boolean) => set({ isDeclaringBlockers }),
}));

export default useCombatStore;
