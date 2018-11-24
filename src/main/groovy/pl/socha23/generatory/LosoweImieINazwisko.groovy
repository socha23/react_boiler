package pl.socha23.generatory

/**
 * Klasa pomocnicza służąca do pseudolosowego generowania danych testowych
 */

import static pl.socha23.generatory.Losowe.*

class LosoweImieINazwisko {
    private static IMIE_KOBIECE = ["Anna", "Maria", "Katarzyna", "Małgorzata", "Agnieszka", "Krystyna", "Barbara",
                                   "Ewa", "Elżbieta", "Zofia", "Janina", "Teresa", "Joanna", "Magdalena", "Monika",
                                   "Jadwiga", "Danuta", "Irena", "Halina", "Helena", "Beata", "Aleksandra", "Marta",
                                   "Dorota", "Marianna", "Grażyna", "Jolanta", "Stanisława", "Iwona", "Karolina",
                                   "Bożena", "Urszula", "Justyna", "Renata", "Alicja", "Paulina", "Sylwia", "Natalia",
                                   "Wanda", "Agata", "Aneta", "Izabela", "Ewelina", "Marzena", "Wiesława",
                                   "Genowefa", "Patrycja", "Kazimiera", "Edyta", "Stefania", ]
    private static IMIE_MESKIE =  ["Jan", "Andrzej", "Piotr", "Krzysztof", "Stanisław", "Tomasz", "Paweł", "Józef",
                                   "Marcin", "Marek", "Michał", "Grzegorz", "Jerzy", "Tadeusz", "Adam", "Łukasz",
                                   "Zbigniew", "Ryszard", "Dariusz", "Henryk", "Mariusz", "Kazimierz", "Wojciech",
                                   "Robert", "Mateusz", "Marian", "Rafał", "Jacek", "Janusz", "Mirosław", "Maciej",
                                   "Sławomir", "Jarosław", "Kamil", "Wiesław", "Roman", "Władysław", "Jakub",
                                   "Artur", "Zdzisław", "Edward", "Mieczysław", "Damian", "Dawid", "Przemysław",
                                   "Sebastian", "Czesław", "Leszek", "Daniel", "Waldemar",]

    private static SYLABA_NAZWISKA = [
            "ba", "bo", "bro", "bu", "bi",
            "ci", "ce", "cę", "cha", "ckie", "co", "czy", "cze", "ćwi", "cie",
            "dą", "dę", "de",
            "fiu", "fie", "fe", "fio",
            "gli", "ge", "gmy", "ga", "go",
            "ju", "ja", "je", "jo",
            "kwi", "ke", "ka", "ką", "kę", "kie", "krza", "kszę", "ku", "ko",
            "le", "li",
            "mię", "mi", "mo", "ma",
            "niu", "nę", "na",
            "po", "prza", "psze", "pszy",
            "re", "ra", "ro", "ru", "szy",
            "sa", "so", "sie", "sia", "się", "sią", "su", "siu",
            "twi", "te", "tu",
            "wią", "wi", "we",
            "za", "ze", "zi",
    ]

    private static KONCOWKA_NAZWISKA_MESKA =
            ["ski", "cki", "lski", "lcki", "ński",]
    private static KONCOWKA_NAZWISKA_KOBIECA =
            ["ska", "cka", "lska", "lcka", "ńska",]
    private static KONCOWKA_NAZWISKA_BEZPLCIOWA =
            ["wak", "wicz", "dzicz", "czuk", "ko", "kół", ""]


    /**
     * Zwraca losowo wybrane imię
     */
    static String imie() {
        trueOrFalse() ? imieMeskie() : imieKobiece()
    }

    /**
     * Zwraca losowe imię męskie
     */
    static String imieMeskie() {
        losowe IMIE_MESKIE
    }

    /**
     * Zwraca losowe imię kobiece
     */
    static String imieKobiece() {
        losowe IMIE_KOBIECE
    }

    /**
     * Zwraca losowo wybrane imię i nazwisko
     */
    static String imieINazwisko() {
        trueOrFalse() ? imieINazwiskoMeskie() : imieINazwiskoKobiece()
    }

    /**
     * Zwraca losowe imię i nazwisko męskie, oddzielone spacją
     */
    static String imieINazwiskoMeskie() {
        imieMeskie() + " " + nazwiskoMeskie()
    }

    /**
     * Zwraca losowe imię i nazwisko kobiece, oddzielone spacją
     */
    static String imieINazwiskoKobiece() {
        imieKobiece() + " " + nazwiskoKobiece()
    }

    /**
     * Zwraca losowe nazwisko męskie
     */
    static String nazwiskoMeskie() {
        nazwisko(KONCOWKA_NAZWISKA_BEZPLCIOWA + KONCOWKA_NAZWISKA_MESKA)
    }

    /**
     * Zwraca losowe nazwisko kobiece
     */
    static String nazwiskoKobiece() {
        nazwisko(KONCOWKA_NAZWISKA_BEZPLCIOWA + KONCOWKA_NAZWISKA_KOBIECA)
    }

    private static String nazwisko(dopuszczalneKoncowki) {
        int iloscSylab = 1 + r.nextInt(3)
        def wynik = ""
        iloscSylab.times {
            wynik += losowa SYLABA_NAZWISKA
        }
        wynik += losowe dopuszczalneKoncowki
        wynik.capitalize()
    }
}
