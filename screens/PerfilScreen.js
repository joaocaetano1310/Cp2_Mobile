import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function PerfilScreen({ route, navigation }) {
  const { nome, rm, telefone, cpf } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.titulo}>Perfil</Text>
        <Text style={styles.subtitulo}>Dados do aluno</Text>

        <View style={styles.card}>
          <Image
            source={{ uri: "" }}
            style={styles.foto}
          />

          <View style={styles.cardResultado}>
            <Text style={styles.resultadoTitulo}>Informações</Text>

            <View style={styles.linhaResultado}>
              <Text style={styles.chave}>Nome</Text>
              <Text style={styles.valor}>{nome}</Text>
            </View>

            <View style={styles.linhaResultado}>
              <Text style={styles.chave}>RM</Text>
              <Text style={styles.valor}>{rm}</Text>
            </View>

            <View style={styles.linhaResultado}>
              <Text style={styles.chave}>Telefone</Text>
              <Text style={styles.valor}>{telefone}</Text>
            </View>

            <View style={styles.linhaResultado}>
              <Text style={styles.chave}>CPF</Text>
              <Text style={styles.valor}>{cpf}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.botaoSecundario} onPress={() => navigation.goBack()}>
            <Text style={styles.textoBotaoSecundario}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282829",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FF0055",
    textAlign: "center",
    marginTop: 10,
  },
  subtitulo: {
    fontSize: 16,
    color: "#FF0055",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#1f1f1f",
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    alignItems: "center",
  },
  foto: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#FF0055",
  },
  cardResultado: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 18,
    width: "100%",
  },
  resultadoTitulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF0055",
    marginBottom: 14,
    textAlign: "center",
  },
  linhaResultado: {
    marginBottom: 10,
  },
  chave: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 3,
  },
  valor: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
  },
  botaoSecundario: {
    borderWidth: 1,
    borderColor: "#FF0055",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
    width: "100%",
  },
  textoBotaoSecundario: {
    color: "#FF0055",
    fontSize: 16,
    fontWeight: "600",
  },
});