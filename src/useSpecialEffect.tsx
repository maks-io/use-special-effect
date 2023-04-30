import { DependencyList, useEffect } from "react";
import usePrevious from "./usePrevious";
import { Comparison } from "./types/Comparison";
import { SpecialEffectCallback } from "./types/SpecialEffectCallback";

const useSpecialEffect = (
  specialEffect: SpecialEffectCallback,
  deps: DependencyList,
  triggeringDeps?: DependencyList
) => {
  const triggerDeps = triggeringDeps ?? deps;
  const prev = usePrevious(triggerDeps) ?? [];
  useEffect(() => {
    const comparison: Comparison = prev.map((prev, index) => ({
      old: prev,
      new: triggerDeps[index],
      triggering: prev !== triggerDeps[index],
    }));
    if (comparison.some((d) => d.triggering)) {
      return specialEffect(...comparison);
    }
  }, deps);
};

export default useSpecialEffect;
