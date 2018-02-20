package pl.socha23.cyberfire.model;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MuseumDescription {

    private String id;

    /**
     * potencjalne zagrożenia pożarowe
     */
    private String dangers = "";

    /**
     * drogi i kierunki ewakuacji zbiorów
     */
    private String evacuationRoutes = "";

    /**
     * sposób sprawdzania organizacji i warunków ewakuacji zbiorów
     */
    private String drillProcedure = "";

    /**
     * techniczne środki umożliwiające ewakuację zbiorów
     */
    private String technicalMeans = "";

    /**
     * miejsca przechowywania i eksponowania najcenniejszych zbiorów
     */
    private String preciousArtifactsLocation = "";

    /**
     * postępowanie przy zabezpieczaniu najcenniejszych zbiorów
     */
    private String preciousArtifactsProcedure = "";

    /**
     * procedury powiadamiania dyrektora i pracowników muzeum oraz
     * osób tworzących zespoły, o których mowa w pkt 8,
     * o powstaniu zagrożenia
     */
    private String communicationProcedure = "";


    /**
     * imiona i nazwiska osób tworzących zespoły mające brać udział
     * w ewakuacji zbiorów, a także zajmowanych przez te osoby
     * stanowisk, z określeniem zakresu ich działania
     * i odpowiedzialności.
     */
    private String evacuationTeam = "";
}
