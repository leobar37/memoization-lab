# Memoization

La memoización es una tecnica que que acelera el rendimiento cacheando el retorno
de funciones de llamadas costosas. Una función "memoizada" retorna inmediatamente un valor preecalculado, si se le da un mismo input que ya haya visto.

Solo podemos memoizar funciones puras, es decir que no tienen dependencias externas.

**Implementación col el factorial**

```ts
const cache: any = {};

const printExample = (label: string, fn: any) => {
  count = 0;
  const values = [100, 50, 30];
  values.forEach((val) => fn(val));
  utils.log(`${label} -> computations: ${count}`);
};

const factorial = (n: number): number => {
  if (n == 0) {
    return 1;
  }
  const result = factorial(n - 1) * n;
  count++;
  return result;
};

printExample("Not memoized", factorial);

const memoizeFactorial = (n: number): number => {
  if (n in cache) {
    return cache[n];
  }
  if (n == 0) {
    cache[n] = 1;
    return 1;
  }
  cache[n] = memoizeFactorial(n - 1) * n;
  count++;
  return cache[n];
};

printExample("Memoized-1", memoizeFactorial);

type AnyFunction = (...args: any[]) => any;

const memoize = <T extends AnyFunction>(fn: T): T => {
  const cache: any = {};
  return ((...args: any[]) => {
    const argskey = JSON.stringify(args);
    if (argskey in cache) {
      return cache[argskey];
    }
    const result = fn(...args);
    cache[argskey] = result;
    return result;
  }) as unknown as T;
};

const newFactorial = memoize((n) => {
  if (n == 0) {
    return 1;
  }
  const result = n * newFactorial(n - 1);
  count++;
  return result;
});

printExample("memoized-2", newFactorial);
```

## React memoization

React ofrecé opciones de evitar el renderizado y hacer solo lo necesario
para que el usuario pueda ver las actualizaciones en la interfaz. Además de
eso React ofrecé un set de utilidades para implementar la memoización.
Dentro de se set de utilidades, se encuentra.

- useMemo
- useCallback
- memo

**memo:**

La función `memo` un HOC(Higher Order Component) que aplica la memoización
a un componente. El cual le puede indicar a react que se salte el renderizado. y reuse el el renderizado anterior.

- Al implementar `memo` no se impide el re-render provocado por el interior
  del componente.

> DEMO CATS

**useMemo:**

## ¿Cuando no memoizar?

- la memoización es apropieda para aquellas funciones donde hay una
  alta chance de que los valores de entrada, se repitan regularmente.

- Mantener la caché incrementa el uso de memoria,ya que todos los
  valores de entrada y salidas deben ser retenidos.

- Esta técnica solo funciona con funciones puras si su función alcanza variables globales o otros estados.No debería memoizarse.

## References

- https://dmitripavlutin.com/use-react-memo-wisely/
- https://dmitripavlutin.com/react-usememo-hook/
- https://everyday.codes/javascript/react-usememo-and-when-you-should-use-it/
