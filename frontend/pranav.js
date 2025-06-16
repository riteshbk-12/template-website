import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export default function CricketScorecardComponent({
  scorecardData,
  playingXIData,
  matchData,
  squadsData,
}) {
  const isUpcoming = matchData?.match_status === "Upcoming";
  const [currentInnings, setCurrentInnings] = useState(null);

  const batsmenData = scorecardData?.[currentInnings]?.batsman || [];
  const bowlerData = scorecardData?.[currentInnings]?.bolwer || [];

  const getNormalizedName = (name) =>
    name?.replace(/\s*\(C\)$/, "").trim() || "";

  const teamAPlayingXI =
    playingXIData?.team_a?.player?.map((player) => player.name) || [];
  const teamBPlayingXI =
    playingXIData?.team_b?.player?.map((player) => player.name) || [];

  const playedBatsmen = batsmenData.map((player) => player.name || "Unknown");
  const normalizedTeamAPlayingXI = teamAPlayingXI.map(getNormalizedName);
  const normalizedTeamBPlayingXI = teamBPlayingXI.map(getNormalizedName);
  const playedBatsmenNormalized = playedBatsmen.map(getNormalizedName);

  const data = [
    { type: "header", title: "Batsman", headers: ["R", "B", "4s", "6s", "SR"] },
    ...batsmenData.map((item) => ({ type: "batsman", item })),
    {
      type: "header",
      title: "Extras",
      headers: [scorecardData?.[currentInnings]?.team?.extras || 0],
    },
    {
      type: "header",
      title: "Total",
      headers: [
        `${scorecardData?.[currentInnings]?.team?.score || 0}(${
          scorecardData?.[currentInnings]?.team?.wicket || 0
        }wkts, ${scorecardData?.[currentInnings]?.team?.over || 0}overs)` ||
          "0/0 (0 overs)",
      ],
    },
    {
      type: "YetToBat",
      title: "Yet To Bat",
      headers:
        scorecardData?.[currentInnings]?.team?.short_name ===
        playingXIData?.team_a?.short_name
          ? teamAPlayingXI
          : teamBPlayingXI,
      normalizedHeaders:
        scorecardData?.[currentInnings]?.team?.short_name ===
        playingXIData?.team_a?.short_name
          ? normalizedTeamAPlayingXI
          : normalizedTeamBPlayingXI,
    },
    {
      type: "FallOfWickets",
      title: "Fall of Wickets",
      headers: scorecardData?.[currentInnings]?.fallwicket || [],
    },
    { type: "header", title: "Bowler", headers: ["O", "M", "R", "W", "ER"] },
    ...bowlerData.map((item) => ({ type: "bowler", item })),
  ];

  const renderSquadsRow = (item) => {
    return item.map((data, index) => (
      <View style={styles.rowContainer} key={index}>
        <View style={styles.infoContainer}>
          <Text style={styles.squadRowText}>{data.name}</Text>
          <Text style={styles.fallOfWicketsText}>{data.play_role}</Text>
        </View>
      </View>
    ));
  };

  useEffect(() => {
    if (scorecardData) {
      const innings = Object.keys(scorecardData);
      setCurrentInnings(innings[innings.length - 1]?.toString() || null);
    }
  }, [scorecardData]);

  if (isUpcoming && squadsData) {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: { backgroundColor: "#f5f5f5" },
          tabBarIndicatorStyle: { backgroundColor: "blue" },
        }}
      >
        <Tab.Screen
          name="TeamA"
          options={{ tabBarLabel: squadsData.team_a?.short_name || "Team A" }}
        >
          {() => <SquadView team={squadsData.team_a} />}
        </Tab.Screen>
        <Tab.Screen
          name="TeamB"
          options={{ tabBarLabel: squadsData.team_b?.short_name || "Team B" }}
        >
          {() => <SquadView team={squadsData.team_b} />}
        </Tab.Screen>
      </Tab.Navigator>
    );
  }

  if (!scorecardData || !playingXIData) {
    return (
      <View style={styles.centeredContainer}>
        <Text>Scorecard data is unavailable.</Text>
      </View>
    );
  }

  const renderRow = (item, rowType) => {
    const rowDetails =
      rowType === "batsman"
        ? [item.run, item.ball, item.fours, item.sixes, item.strike_rate]
        : [item.over, item.maiden, item.run, item.wicket, item.economy];

    return (
      <View style={styles.rowContainer}>
        <View style={styles.infoContainer}>
          <Text style={styles.rowText}>{item.name || "Unknown"}</Text>
          {rowType === "batsman" && (
            <Text style={styles.rowText}>
              {item.out_by?.trim() || "Not Out"}
            </Text>
          )}
        </View>
        <View style={styles.detailsContainer}>
          {rowDetails.map((data, index) => (
            <Text key={index} style={styles.rowText}>
              {data ?? "-"} {/* Handles undefined or null values */}
            </Text>
          ))}
        </View>
      </View>
    );
  };

  const renderYetToBat = (title, headers, normalizedHeaders) => {
    const validHeaders = Array.isArray(headers) ? headers : [];
    const validNormalizedHeaders = Array.isArray(normalizedHeaders)
      ? normalizedHeaders
      : [];

    return (
      <View style={styles.specialRow}>
        <Text style={styles.headerText}>{title}</Text>
        <Text style={styles.fallOfWicketsText}>
          {validHeaders
            .filter(
              (_, index) =>
                !playedBatsmenNormalized.includes(validNormalizedHeaders[index])
            )
            .join(" · ")}
        </Text>
      </View>
    );
  };

  const renderFallOfWicket = (title, headers) => (
    <View style={styles.specialRow}>
      <Text style={styles.headerText}>{title}</Text>
      <Text style={styles.fallOfWicketsText}>
        {headers
          ?.map(
            (header) =>
              ${header.score}/${header.wicket} (${header.player}, ${header.over})
          )
          .join(" · ") || "No fall of wickets data"}
      </Text>
    </View>
  );

  const renderSectionHeader = (title, headers) => (
    <View style={styles.tableHeader}>
      <Text style={styles.headerText}>{title}</Text>
      <View style={styles.subHeaderContainer}>
        {headers?.map((header, index) => (
          <Text key={index} style={styles.rowText}>
            {header}
          </Text>
        ))}
      </View>
    </View>
  );

  const inningsTabs = Object.keys(scorecardData || {}).map((inningKey) => ({
    name: inningKey,
    label: scorecardData[inningKey]?.team?.short_name || "Inning",
    component: () => (
      <ScorecardView
        data={scorecardData[inningKey]}
        playingXIData={playingXIData}
      />
    ),
  }));
  const TestScorecardView = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Scorecard Data for Testing</Text>
      </View>
    );
  };
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: "#f5f5f5" },
        tabBarIndicatorStyle: { backgroundColor: "blue" },
      }}
    >
      {inningsTabs.map((tab, index) => (
        <Tab.Screen
          key={index}
          name={tab.name}
          options={{ tabBarLabel: tab.label }}
        >
          {tab.component}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );

  function ScorecardView({ playingXIData }) {
    return (
      <View style={styles.rootContainer}>
        <View>
          {data.map((item, index) => {
            if (item.type === "header") {
              return (
                <View key={header-${index}}>
                  {renderSectionHeader(item.title, item.headers)}
                </View>
              );
            }
            if (item.type === "YetToBat") {
              return (
                <View key={yetToBat-${index}}>
                  {renderYetToBat(
                    item.title,
                    item.headers,
                    item.normalizedHeaders
                  )}
                </View>
              );
            }
            if (item.type === "FallOfWickets") {
              return (
                <View key={fallOfWickets-${index}}>
                  {renderFallOfWicket(item.title, item.headers)}
                </View>
              );
            }
            return (
              <View key={row-${index}}>
                {item.type === "batsman" && renderRow(item.item, "batsman")}
                {item.type === "bowler" && renderRow(item.item, "bowler")}
              </View>
            );
          })}
        </View>
      </View>
    );
  }

  function SquadView({ team }) {
    if (!team) return <Text>Team data unavailable</Text>;
    console.log(JSON.stringify(team, null, 2));

    return (
      <View style={styles.rootContainer}>
        <Text style={styles.squadheaderText}>{${team.name} Squad}</Text>
        {renderSquadsRow(team.player)}
        <View style={styles.rowContainer}>
          <Text style={styles.headerText}>Venue</Text>
          <View style={styles.subHeaderContainer}>
            <Text style={styles.rowText}>{""}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    zIndex: 999,
    borderWidth: 1,
    borderColor: "red", // Helps debug container size
  },
  inningsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowContainer: {
    flexDirection: "row",
    marginVertical: 5,
  },
  infoContainer: {
    flex: 1,
  },
  detailsContainer: {
    flexDirection: "row",
  },
  rowText: {
    fontSize: 14,
    marginHorizontal: 5,
  },
  subHeaderContainer: {
    flexDirection: "row",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  specialRow: {
    marginVertical: 10,
  },
  squadRowText: {
    fontSize: 14,
  },
  squadheaderText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  fallOfWicketsText: {
    fontSize: 14,
    color: "gray",
  },
  centeredContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
});