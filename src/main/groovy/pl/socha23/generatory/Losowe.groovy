package pl.socha23.generatory

/**
 * Klasa zawiera statyczne metody pomocnicze do innych generatorów
 */
class Losowe {
    private static Random r = new Random()

    /**
     * Losuje wybraną wartość z przekazanej kolekcji, z równym prawdopodobieństwem
     */
    public static <T> T losowe(Collection<T> wartosci) {
        wartosci[r.nextInt(wartosci.size())]
    }

    /**
     * Losuje wybraną wartość z przekazanej kolekcji, z równym prawdopodobieństwem. Alias na 'losowe'
     */
    public static <T> T losowa(Collection<T> wartosci) {
        losowe wartosci
    }

    /**
     * Zwraca true z prawdopodobieństwem 0.5
     */
    public static boolean trueOrFalse() {
        r.nextBoolean()
    }

    /**
     * Zwraca liczbę mającą zadaną ilość cyfr
     */
    public static long liczba(int ileCyfr) {
        long result = 0
        for (int i = 0; i < ileCyfr; i++) {
            result *= 10
            result += (i == 0 ? 1 + r.nextInt(9) : r.nextInt(10))
        }
        result
    }

    /**
     * Zwraca licbę do jakiejś maksymalnej wartości
     */
    public static long liczbaDo(int max) {
        r.nextInt(max)
    }

    public static long liczbaOdDo(int od, int max) {
        return od + liczbaDo(max - od)
    }

    public static double doubleDo(double max) {
        r.nextDouble() * max;
    }
}
