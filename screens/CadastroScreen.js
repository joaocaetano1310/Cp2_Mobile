import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaskedTextInput } from "react-native-mask-text";

export default function CadastroScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [rm, setRm] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");

  useEffect(() => {
    async function carregarDados() {
      try {
        const dadosSalvos = await AsyncStorage.getItem("@usuario");

        if (dadosSalvos) {
          const usuario = JSON.parse(dadosSalvos);
          setNome(usuario.nome || "");
          setRm(usuario.rm || "");
          setTelefone(usuario.telefone || "");
          setCpf(usuario.cpf || "");
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar os dados.");
      }
    }

    carregarDados();
  }, []);

  async function cadastrarAluno() {
    if (!nome || !rm || !telefone || !cpf) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    const usuario = { nome, rm, telefone, cpf };

    try {
      await AsyncStorage.setItem("@usuario", JSON.stringify(usuario));

      navigation.navigate("Perfil", {
        nome,
        rm,
        telefone,
        cpf,
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar os dados.");
    }
  }

  async function buscarAluno() {
    try {
      const dadosSalvos = await AsyncStorage.getItem("@usuario");

      if (!dadosSalvos) {
        Alert.alert("Aviso", "Nenhum aluno cadastrado foi encontrado.");
        return;
      }

      const usuario = JSON.parse(dadosSalvos);

      setNome(usuario.nome || "");
      setRm(usuario.rm || "");
      setTelefone(usuario.telefone || "");
      setCpf(usuario.cpf || "");

      navigation.navigate("Perfil", {
        nome: usuario.nome || "",
        rm: usuario.rm || "",
        telefone: usuario.telefone || "",
        cpf: usuario.cpf || "",
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível buscar o aluno.");
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.titulo}>Cadastro</Text>
      <Text style={styles.subtitulo}>Preencha os dados do aluno</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          placeholderTextColor="#6b7280"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>RM</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu RM"
          placeholderTextColor="#6b7280"
          value={rm}
          onChangeText={setRm}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Telefone</Text>
        <MaskedTextInput
          style={styles.input}
          placeholder="(11) 99999-9999"
          placeholderTextColor="#6b7280"
          mask="(99) 99999-9999"
          keyboardType="numeric"
          value={telefone}
          onChangeText={(text) => setTelefone(text)}
        />

        <Text style={styles.label}>CPF</Text>
        <MaskedTextInput
          style={styles.input}
          placeholder="000.000.000-00"
          placeholderTextColor="#6b7280"
          mask="999.999.999-99"
          keyboardType="numeric"
          value={cpf}
          onChangeText={(text) => setCpf(text)}
        />

        <TouchableOpacity style={styles.botao} onPress={cadastrarAluno}>
          <Text style={styles.textoBotao}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoSecundario} onPress={buscarAluno}>
          <Text style={styles.textoBotaoSecundario}>Buscar Aluno</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282829",
  },
  content: {
    flexGrow: 1,
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 15,
    backgroundColor: "#ffffff",
    color: "#000000",
  },
  botao: {
    backgroundColor: "#FF0055",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  textoBotao: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  botaoSecundario: {
    borderWidth: 1,
    borderColor: "#FF0055",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  textoBotaoSecundario: {
    color: "#FF0055",
    fontSize: 16,
    fontWeight: "600",
  },
});